const mutations = `#graphql
    createUser(input:createUserType):String,

    loginUser(input:loginArguType):userLoginType
    
    verifyOtp(input:verifyOtpType):String

    singleUpload(file: Upload!): String
`;

export default mutations;
