export default {
	MAX_ATTACHMENT_SIZE: 5000000,
	s3: {
		REGION: "us-east-1",
		BUCKET: "notes-app-uploads-jb1"
	},
	apiGateway: {
		REGION: "us-east-1",
		URL: "https://jhdpxm3s7k.execute-api.us-east-1.amazonaws.com/prod"
	},
	cognito: {
		REGION: "us-east-1",
		USER_POOL_ID: "us-east-1_oIxkhIsZe",
		APP_CLIENT_ID: "4mskngk0v2cmuliifhih8cb5ch",
		IDENTITY_POOL_ID: "us-east-1:03dd8105-199f-4ff5-a499-f87cf19fac07"
	}
};
