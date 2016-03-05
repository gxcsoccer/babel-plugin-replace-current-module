import 'should';
import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { transformFileSync } from 'babel-core';
import plugin from '../src';

const pkg = require('../package');

describe('index.test.js', () => {

  it(`should work ok`, () => {
    const actual = transformFileSync(join(__dirname, 'fixtures/actual.js'), {
      presets: [],
      plugins: [plugin],
    }).code;

    actual.should.equal(`'use strict';\n\nwindow['${pkg.name}'] = require('${process.cwd()}/lib/index.js');`)
  });

});
