module.exports = {
    get: jest.fn((url) => {
        console.log(url)
        switch (url){
            case('/auth/user'):
                return Promise.resolve({
                    data: {user:{name:{first:"David",last:"Spade"},_id:"ABCDE"}}
                });
            case('/trackerapi/getactivities'):
                return Promise.resolve({
                    data:[
                        {
                        _id: "5d6dcb961481e000175480b1",
                        user: "5ba7cb4d60c0491f28f5ca5c",
                        beg: "2019-09-02T13:00:00.000Z",
                        end: "2019-09-02T21:00:00.000Z",
                        Activity: "Code"
                        },
                        {
                        _id: "5d90b6fb2b50590017abce00",
                        user: "5ba7cb4d60c0491f28f5ca5c",
                        beg: "2019-09-29T14:00:00.000Z",
                        end: "2019-09-29T18:00:00.000Z",
                        Activity: "hang out"
                        }
                    ]}
                )
            case('/trackerapi/getactivitytypes'):
                return Promise.resolve({
                    data:['Exercise','Sleep','Code']
                })
            
        }
    })  
};