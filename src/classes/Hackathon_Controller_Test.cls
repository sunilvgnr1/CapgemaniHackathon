@isTest
public class Hackathon_Controller_Test {

    @isTest static void method(){
        Account Acc1=new Account(Name='Sunil');
        Account Acc2=new Account(Name='Amit');
        Account Acc3=new Account(Name='Ramesh');
        List<Account> Acclist=new List<Account>();
        Acclist.add(Acc1);
        Acclist.add(Acc2);        
        insert Acclist;
        Hackathon_Controller.saveListOfRecords(Acclist);
        insert Acc3;
        Hackathon_Controller.deleteRecord(Acc3.id);
        Hackathon_Controller.massDeleteRecords(Acclist);
        sObject Obj= new account();
        Hackathon_Controller.getPickListValues(Obj, 'AccountSource');
        
    }
}