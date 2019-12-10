import React from 'react';
import App from '../App';
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import axios from 'axios';
import { mount } from './enzyme'

const mockStore = configureMockStore([thunk])
const store=mockStore({activities:[],types:[],span:{start:'',end:''}})


jest.mock('axios');
const getSpy = jest.spyOn(axios, 'get');

it('renders without crashing', (done) => {
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>);
    console.log(wrapper.find(BrowserRouter) )
  done()
});

it(`requests the '/auth/user' route`, ()=>{
  expect(getSpy).toHaveBeenCalledWith("/auth/user")
})


