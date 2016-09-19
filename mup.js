module.exports = {
    servers: {
        one: {
            host: '138.197.138.68',
            username: 'root',
            // pem:
            password: "SHaolinsoccer10"
            // or leave blank for authenticate from ssh-agent
        }
    },

    meteor: {
        name: 'ForumLive',
        path: '../app',
        servers: {
            one: {}
        },
        buildOptions: {
            serverOnly: true,
        },
        env: {
            ROOT_URL: 'http://138.197.138.68/',
            MONGO_URL: 'mongodb://localhost/meteor'
        },

        //dockerImage: 'kadirahq/meteord'
        deployCheckWaitTime: 60
    },

    mongo: {
        oplog: true,
        port: 27017,
        servers: {
            one: {},
        },      
    },
};