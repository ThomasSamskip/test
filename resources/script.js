          
var config={
	host:"playground.qlik.com",
	prefix:"/playground/",
	port:"443",
	isSecure:true,
	rejectUnauthorized:false,
	apiKey:"z8eEINJNE58kLpTSJccQY13drBRM1p9M",
	appname:"a735ec6e-1450-4797-b98c-ce06cfe2c351"
};

function authenticate(){
  Playground.authenticate(config);
}


function main(){
	Playground.notification.deliver({
		title: "Please wait...",
		message: "Connecting"
	});
  require.config({
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources",
  });

  require(['js/qlik'], function(qlik) {
		Playground.notification.deliver({
			title: "Ready",
			message: "Connecting",
			duration: 200
		});
    qlik.setOnError( function ( error ) {
      console.log(error);
			Playground.notification.deliver({
				title: "Error",
				message: error
			});
    });
    console.log(qlik);
    var app = qlik.openApp(config.appname, config);
    console.log(app);
    app.model.waitForOpen.promise.then(function(){
       senseSearch.connectWithCapabilityAPI(app);
    });
  });

}
