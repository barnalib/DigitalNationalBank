import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PayeeService } from '../payee/services/payee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Output('triggerLoan') triggerLoan = new EventEmitter();

  cardUrl = "../assets/card.png";
  atmMoreUrl = "../assets/Layer33.png";
  receiverImage = "../assets/Layer13.png";
  electricityImageUrl = "../assets/Layer24.png";
  internetImageUrl = "../assets/Layer25.png";
  insuranceImageUrl = "../assets/Layer26.png";
  waterImageUrl = "../assets/Layer27.png";
  accStatementImageUrl = "../assets/Layer28.png";
  statementDownloadImageUrl = "../assets/Layer29.png";
  mobileBankingImageUrl = "../assets/Layer30.png";
  mobileBankingImageUrl2 = "../assets/finance.png";
  cloudBankingImageUrl = "../assets/Layer31.png";
  cloudBankingImageUrl2 = "../assets/car_loan.png";
  dateFilterLogo = "../assets/Layer34.png";
  typeFilterLogo = "../assets/Layer36.png";
  ongoingLoanImg = "../assets/ic1.png";
  approvalLoanImg = "../assets/ic2.png";
  upcomingEmiImg = "../assets/ic3.png";

  cardNumberDisplay = false;
  hideCardNumber = "xxxx xxxx xxxx 3005";
  displayedCardNumber = "0898 8908 4355 3005";

  accountHolderName = "Gomti Prabha";
  accountNumber = "";
  payMoreImageUrl = "";
  receiverLength = 10;
  accStatementSelect = 'account';
  selected: { start: '01/01/2001', end: '01/01/2001' };

  accountBallance = 0;
  lastTransactionAmount = 0;
  ongoingLoanCount = 0;
  approvalLoanCount = 0;
  today = new Date();
  upcomingEmiCount = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 7);
  searchText = "";

  bankSlideDisplay = 1;
  mobileSlideDisplay = 1;

  arrowImg = "../assets/ar1.png";
  isDesc = true;

  single: any[];
  upcomingPayment = [{
    "logo": "../assets/Layer38.png",
    "name": "Playstation Plus",
    "type": "Subscription",
    "charges": "29,49 USD",
    "time": "December 15, 2018",
    "bgcolor": "#1D3C8C"
  }, {
    "logo": "../assets/Layer39.png",
    "name": "HBO Premium",
    "type": "Subscription",
    "charges": "9,90 USD",
    "time": "December 24, 2018",
    "bgcolor": "#47484A"
  }, {
    "logo": "../assets/Layer40.png",
    "name": "Netflix Premium",
    "type": "Payment card",
    "charges": "19,00 USD",
    "time": "December 28, 2018",
    "bgcolor": "#ED402E"
  }];

  transactionTada = [];

  view: any[] = [300, 300];

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "December"];
  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  typeFilter = "";

  expensesAmount = 0;
  expensesMsg = "";

  colorScheme = {
    domain: ['#67EB40', '#46C620', '#2EA30B', '#EBF038', '#E32B19', '#C11908', '#5F4EC8']
  };

  constructor(private payeeService: PayeeService) {
    var accountNo = document.cookie.split(";")[0];
    var accountNoTxt = accountNo.split("=")[1].trim();
    var userId = document.cookie.split(";")[1];
    var userIdTxt = userId.split("=")[1].trim();

    this.accountNumber = accountNoTxt;

    console.log(accountNoTxt, userIdTxt);
    //Block to get transaction detail

    this.payeeService.getRecentTransaction(accountNoTxt).subscribe((resp) => {
      console.log("getRecentTransaction");
      console.log(resp);
      this.transactionTada = resp['transactions'];
      if (this.transactionTada.length != 0) {
        this.lastTransactionAmount = this.transactionTada[0].amount;
      }
    }, error => {
      console.log("getRecentTransaction error");
      console.log(error);
    });

    this.payeeService.getAccountDetail(userIdTxt).subscribe((resp) => {
      console.log("getAccountDetail");
      console.log(resp[0].accountBalance);
      this.accountBallance = resp[0].accountBalance;
    }, error => {
      console.log("getAccountDetail error");
      console.log(error);
    });

    this.payeeService.getLoanList(accountNoTxt).subscribe((loanList) => {
      console.log("getLoanList");
      var loanListData = Object.assign(loanList);
      for (var i = 0; i < loanListData.length; i++) {
        if (loanListData[i].status == "DISBURSED") {
          this.ongoingLoanCount = this.ongoingLoanCount + 1;
        } else if (loanListData[i].status == "PENDING") {
          this.approvalLoanCount = this.approvalLoanCount + 1;
        }
      }
    });

    var single = [{
      "name": "Food Items",
      "value": 400
    },
    {
      "name": "Grocery",
      "value": 346
    }, {
      "name": "Mobile Bill/Internet",
      "value": 230
    },
    {
      "name": "Water",
      "value": 54
    }, {
      "name": "Electricity",
      "value": 287
    },
    {
      "name": "Shopping",
      "value": 278
    },
    {
      "name": "Insurance",
      "value": 118
    }
    ];
    this.expensesMsg = "Total January Spending";
    this.single = single;
    this.expensesAmount = 400.40;
    Object.assign(this, { single });

    this.AnimateSlider();
  }

  ngOnInit() {
  }

  AnimateSlider() {
    if (this.payeeService.getCurrentComponent() == "dashboard" || this.payeeService.getCurrentComponent() == "") {
      var currObj = this;
      setTimeout(function () {
        currObj.bankSlideDisplay = currObj.bankSlideDisplay == 1 ? 2 : 1;
        currObj.mobileSlideDisplay = currObj.mobileSlideDisplay == 1 ? 2 : 1;
        currObj.AnimateSlider();
      }, 5000);
    }
  }

  onSelectionChange(value) {
    var single = [];
    single = [{
      "name": "Food Items",
      "value": Math.floor(Math.random() * 99) + 100
    },
    {
      "name": "Grocery",
      "value": Math.floor(Math.random() * 99) + 100
    }, {
      "name": "Mobile Bill/Internet",
      "value": Math.floor(Math.random() * 99) + 100
    },
    {
      "name": "Water",
      "value": Math.floor(Math.random() * 99) + 100
    }, {
      "name": "Electricity",
      "value": Math.floor(Math.random() * 99) + 100
    },
    {
      "name": "Shopping",
      "value": Math.floor(Math.random() * 99) + 100
    },
    {
      "name": "Insurance",
      "value": Math.floor(Math.random() * 99) + 100
    }
    ];

    if (value == "1") {
      this.single = single;
      this.expensesAmount = 450.69;
    } else if (value == "2") {
      this.single = single;
      this.expensesAmount = 500.01;
    } else if (value == "3") {
      this.single = single;
      this.expensesAmount = 645.00;
    } else if (value == "4") {
      this.single = single;
      this.expensesAmount = 428.01;
    } if (value == "5") {
      this.single = single;
      this.expensesAmount = 145.80;
    } else if (value == "6") {
      this.single = single;
      this.expensesAmount = 910.90;
    } if (value == "7") {
      this.single = single;
      this.expensesAmount = 234.43;
    } else if (value == "8") {
      this.single = single;
      this.expensesAmount = 169.34;
    } if (value == "9") {
      this.single = single;
      this.expensesAmount = 877.00;
    } else if (value == "10") {
      this.single = single;
      this.expensesAmount = 563.43;
    } if (value == "11") {
      this.single = single;
      this.expensesAmount = 400.10;
    } else if (value == "0") {
      this.single = single;
      this.expensesAmount = 502.93;
    }

    this.expensesMsg = "Total " + this.months[parseInt(value)] + " Spending";
    Object.assign(this, { single });
  }

  ApplyNewLoan() {
    this.triggerLoan.emit("loan");
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.arrowImg = this.isDesc ? "../assets/ar1.png" : "../assets/ar2.png";
    //this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.transactionTada.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

  Exchange() {

  }

}
