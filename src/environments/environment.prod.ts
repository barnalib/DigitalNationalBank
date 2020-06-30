export const environment = {
  production: true,
  payeeService: {
    get: 'http://payee-dnb.eu-gb.mybluemix.net/api/payee',
    account: 'http://payee-dnb.eu-gb.mybluemix.net/api/payee/account',
  },                
  //recentTransaction:'http://transaction-ejb-cpfa-dnb.icp4acluster-8fedc72a8a1f2d5622b98d95c90d7044-0000.us-south.containers.appdomain.cloud/ejb-war/api/v1/transaction',
  recentTransaction:'http://istio-ingressgateway-istio-system.cp4a-demo-cluster-atci-83bcef15400c39e8de4fdef573e95a5c-0000.au-syd.containers.appdomain.cloud/ejb-war/api/v1/transaction',
  fundTransfer:'http://dnb-transfer-cpfa-dnb.ocp-app-mod-055be62028fec1a956793dedf3faa04a-0001.us-east.containers.appdomain.cloud/api/v1/fund_transfer',
  //login:'http://test-mvc-stack-cpfa-dnb.icp4acluster-8fedc72a8a1f2d5622b98d95c90d7044-0000.us-south.containers.appdomain.cloud/api/v1/accounts/uuid',
  login:'http://istio-ingressgateway-istio-system.cp4a-demo-cluster-atci-83bcef15400c39e8de4fdef573e95a5c-0000.au-syd.containers.appdomain.cloud/api/v1/accounts/user',
  loanlist:'http://dnb-loan-process-cpfa-dnb.ocp-app-mod-055be62028fec1a956793dedf3faa04a-0001.us-east.containers.appdomain.cloud/api/v1/loandtl',
  loan:'http://dnb-loan-req-cpfa-dnb.ocp-app-mod-055be62028fec1a956793dedf3faa04a-0001.us-east.containers.appdomain.cloud/api/v1/loan'
};
