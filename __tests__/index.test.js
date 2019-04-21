import React from 'react';
import Home from '../pages/index';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Home />);
});

describe('testing index page', () => {
  it('index page successfully loads', () => {
    expect(wrapped.find('div').length).toEqual(1);
  });
});

describe('With Snapshot Testing', () => {
  it('App shows "Hello world!"', () => {
    const component = renderer.create(<Home />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})