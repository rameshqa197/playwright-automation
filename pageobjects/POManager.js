
const{LoginPage}= require('../pageobjects/LoginPage')
const{DashboardPage}= require('../pageobjects/DashboardPage')
const{CartPage}= require('../pageobjects/CartPage')
const{OrdersHistoryPage}= require('../pageobjects/OrdersHistoryPage')
const{OrdersReviewPage}= require('../pageobjects/OrdersReviewPage') 

class POManager{

    constructor(page){

        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
        this.ordersReviewPage = new OrdersReviewPage(page);

    }

    getLoginPage(){
        return this.loginPage;  
    }

    getDashboardPage(){
        return this.dashboardPage;
    }   

    getCartPage(){
        return this.cartPage;
    }

    getOrdersHistoryPage(){
        return this.ordersHistoryPage;
    }   

    getOrdersReviewPage(){
        return this.ordersReviewPage;
    }   


}
module.exports= {POManager};