import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PhotoComponent from '../src/components/atoms/PhotoComponent';

describe('PhotoComponent', () => {
  test('renders correctly', () => {
    const {getByText, getByTestId} = render(<PhotoComponent />);
    const titleElement = getByText(
      'Click on the button to take or select a photo!!!',
    );
    const buttonElement = getByTestId('camera-button');

    expect(titleElement).toBeTruthy();
    expect(buttonElement).toBeTruthy();
  });

  test('navigates to CameraScreen when button is pressed', () => {
    const mockNavigate = jest.fn();
    jest.mock('@react-navigation/native', () => ({
      useNavigation: () => ({
        navigate: mockNavigate,
      }),
    }));

    const {getByTestId} = render(<PhotoComponent />);
    const buttonElement = getByTestId('camera-button');

    fireEvent.press(buttonElement);
    expect(mockNavigate).toHaveBeenCalledWith('CameraScreen');
  });
});
