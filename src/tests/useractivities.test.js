import React from 'react'
import UserActivities from '../components/useractivities'
import ActivityTypeItem from '../components/useractivities/activityTypeItem'
import axios from 'axios'
import { mount, shallow } from './enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';


jest.mock('axios');
const getSpy = jest.spyOn(axios,'get');
const mockStore = configureMockStore([thunk])
let Emptystore=mockStore({activities:[],types:[],span:{start:'',end:''}})
let FullStore=mockStore({activities:[],types:[{activitytype:"Work"},{activitytype:"Code"}],span:{start:'',end:''}})
let wrapper

it(`calls '/trackerapi/getactivitytypes' if store does not contain any types`,()=>{
    wrapper = mount(<UserActivities store={Emptystore} />)
    expect(getSpy).toHaveBeenCalledWith("/trackerapi/getactivitytypes")
})

it(`displays event types if the store contains them`,()=>{
    wrapper = mount(<UserActivities store={FullStore} />)
    expect(wrapper.find(ActivityTypeItem).length).toBe(2)
})