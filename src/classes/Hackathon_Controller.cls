/*
*Author 	:	Sunil Vaggannavar
*ClassName	: 	Hackathon_Controller
*Date		: 	13/10/2018
*Purpose	:	Purpose of this class is to 
				@ Fetch the Account Details to Lightning Page
				@ Method to fetch the picklist values in Lightning Page
				@ Method to Save the Accounts 
				@ Method to Delete the Accounts
*Version 	:	43.0
*/
public class Hackathon_Controller {
    
    Public Static STRING QUERYSTRING='SELECT Id, AccountSource, CreatedBy.Name, AnnualRevenue, Industry, AccountNumber, Type, Name, Ownership FROM Account Order by LastModifiedDate DESC LIMIT 10 ';
    
	@AuraEnabled
    public static List<Account> getListOfRecords() {    
        List<Account> listOfRecords  = Database.query(QUERYSTRING);    
        return listOfRecords;       
    }
        
         
	@AuraEnabled
    public static List<Account> saveListOfRecords(List<Account> listOfrec) { 
        List<Account>  listOfids=new List<Account>();
        for(Account acc:listOfrec ){
            listOfids.add(acc);
        }
       upsert listOfids;        
       return getListOfRecords(); 
    }
    
   @AuraEnabled
    public static List<Account> deleteRecord(Id recIdforDel) {
        system.debug('-->'+recIdforDel);
        List<Account> accList=new List<Account>();       
        accList.add(new account(Id=recIdforDel));
        Database.delete(accList);
        return getListOfRecords();      
    }  
    
    
          
   @AuraEnabled
    public static List<Account> massDeleteRecords(List<Account> listOfAcc) {
        system.debug('-->'+listOfAcc);
       List<Account>  listOfids=new List<Account>();
        for(Account acc:listOfAcc ){
            listOfids.add(acc);
        }
        Database.delete(listOfids);
        return getListOfRecords();      
    }  
        
    @AuraEnabled
    public static List<String> getPickListValues(sObject Obj, string field){        
        List<String> options 						= new List<String>();      
        Schema.sObjectType objType 					= Obj.getSObjectType();       
        Schema.DescribeSObjectResult objDescribe 	= objType.getDescribe();
        map < String, Schema.SObjectField > fieldMap= objDescribe.fields.getMap();
        list < Schema.PicklistEntry > values		= fieldMap.get(field).getDescribe().getPickListValues();
        for (Schema.PicklistEntry f: values) {
            options.add(f.getValue());
        }
        return options;
        
    }
    
        
}