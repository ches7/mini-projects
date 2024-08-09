/**
 * @jest-environment jsdom
 */

import { describe, it, expect, afterEach } from '@jest/globals'

import { render, screen, cleanup, fireEvent } from '@testing-library/react'

import SelectForm from './SelectForm'
import React from 'react';
import { act } from 'react';

describe('SelectForm', () => {
  const mockData = ['A', 'B', 'C', 'D']

  afterEach(cleanup)

  it('renders to the page', () => {
    render(<SelectForm formData={mockData}/>)
    screen.debug()
  })

  it('renders a form with a label', () => {
    render(<SelectForm formData={mockData}/>)
    
    expect(screen.getByLabelText('Select by topic:')).toBeDefined()
  })

  it('fires an event handler when the button is clicked', () => {
    const eventHandler = jest.fn()
    render(<SelectForm onSelect={eventHandler} formData={mockData} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(eventHandler).toHaveBeenCalledTimes(1);
  })
})