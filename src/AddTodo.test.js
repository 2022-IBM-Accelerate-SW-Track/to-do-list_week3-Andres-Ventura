import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate1 = "05/30/2023";
  const dueDate2 = "05/10/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate1}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate2}});
  fireEvent.click(element);
  screen.getByText(/History Test/i);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument;
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const element = screen.getByRole('button', {name: /Add/i});
    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.click(element);
    const check = screen.getByText(/You have no todo's left/i);
    expect(check).toBeInTheDocument;
  
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/22/2022";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const historyCheck = screen.getByTestId(/History Test/i).style.background;
  expect(historyCheck).toBe("rgb(255, 87, 87)");
 });
