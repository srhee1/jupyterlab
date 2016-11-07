// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import expect = require('expect.js');

import {
  CSVModel, CSVTable, DISPLAY_LIMIT
} from '../../../lib/csvwidget/table';

import {
  CSV_DATA
} from './data.csv';


describe('csvwidget/table', () => {

  describe('CSVModel', () => {

    describe('#constructor()', () => {

      it('should instantiate a `CSVModel`', () => {
        let model = new CSVModel();
        expect(model).to.be.a(CSVModel);
        model.dispose();
      });

      it('should accept content and delimiter values', () => {
        let content = 'foo';
        let delimiter = '\t';
        let model = new CSVModel({ content, delimiter });
        expect(model).to.be.a(CSVModel);
        expect(model.content).to.be(content);
        expect(model.delimiter).to.be(delimiter);
        model.dispose();
      });

    });

    describe('#maxExceeded', () => {

      it('should emit the overflow delta upon parsing', () => {
        let model = new CSVModel({ content: CSV_DATA });
        let excess: CSVModel.IOverflow;
        model.maxExceeded.connect((sender, overflow) => { excess = overflow; });
        expect(excess).to.not.be.ok();
        model.parse();
        expect(excess).to.be.ok();
        expect(excess.available).to.be(1002);
        expect(excess.maximum).to.be(DISPLAY_LIMIT);
        model.dispose();
      });

    });

    describe('#delimiter', () => {

      it('should default to `,`', () => {
        let model = new CSVModel();
        expect(model.delimiter).to.be(',');
        model.dispose();
      });

      it('should be settable', () => {
        let model = new CSVModel();
        expect(model.delimiter).to.be(',');
        model.delimiter = ';';
        expect(model.delimiter).to.be(';');
        model.dispose();
      });

    });

    describe('#dispose()', () => {

      it('should dispose of the resources held by the model', () => {
        let model = new CSVModel();
        expect(model.isDisposed).to.be(false);
        model.dispose();
        expect(model.isDisposed).to.be(true);
      });

      it('should be safe to call multiple times', () => {
        let model = new CSVModel();
        expect(model.isDisposed).to.be(false);
        model.dispose();
        model.dispose();
        expect(model.isDisposed).to.be(true);
      });

    });

  });

});
