import React from 'react';
import Home from '../pages/index';
import { shallow } from 'enzyme';
import { expect } from 'chai';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Home />);
});

describe('testing index page', () => {
  it('index page successfully loads', () => {
    expect(wrapped.find('div').length).to.equal(1);
  });
});
