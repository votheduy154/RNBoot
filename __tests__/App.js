import renderer from 'react-test-renderer';
import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  const tree = renderer.create(<App />);
});
