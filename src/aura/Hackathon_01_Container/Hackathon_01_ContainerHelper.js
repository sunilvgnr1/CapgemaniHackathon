({
    /*ServerCallMethod:Used to fetch the latest account record*/
     ServerCallMethod: function(component, event, helper) { 
         
        var action = component.get("c.getListOfRecords");  
        var extraFields=component.get("v.extraFields");       
              action.setParams({ extraFieldsList :extraFields});     
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               component.set("v.mydata",response.getReturnValue());	
                
               component.set("v.DataLoaded",true);
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    /*SaveMethod:Used to Save the 'Updated Account Source' Records*/
     SaveMethod:function(component, event, helper) {
       var emptyList = [];
       var extraFields=component.get("v.extraFields");       
             
       var action 	 = component.get("c.saveListOfRecords");
         action.setParams({ 	listOfrec		 : component.get("v.ListForUpdateSource"),
                           extraFieldsList :extraFields });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") { 
              		var params={ "title": "Success!",mode: 'sticky',type: "Success","message": "Records Saved"};
           	  		helper.showToasts(component, params, event);
               		component.set("v.mydata",response.getReturnValue());
                	component.set("v.isOpen", false);
                	component.set("v.ListForUpdateSource",emptyList);                	
				 }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action);
    },
     getAccountSource : function(component, event, helper){
        var fieldname = "AccountSource";
        var action = component.get("c.getPickListValues");
        action.setParams({
            "Obj"  : component.get("v.objInfo"),
            "field": fieldname
        });
        var opts=[];
        action.setCallback(this, function(a) {
            
            var allValues = a.getReturnValue();
            if (allValues != undefined && allValues.length > 0) {
                opts.push({
                    class: "optionClass",
                    label: "--None--",
                    value: ""
                });
            }
            for (var i = 0; i < allValues.length; i++) {
                opts.push({
                    class: "optionClass",
                    label: allValues[i],
                    value: allValues[i]
                });
            }
            component.set("v.AccSourceOptions", opts);
            
        });
        $A.enqueueAction(action); 
    },  
    massDeleteMethod:function(component, event, helper,lis,type) { 
	   var emptyList 	= [];  
       var extraFields	= component.get("v.extraFields");   
       var action 		= component.get("c.massDeleteRecords");
          	action.setParams({ listOfAcc  	:lis,
                             extraFieldsList :extraFields});               
         	action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") { 
                var params={ "title": "Success",mode: 'sticky',type: "Success","message": "Selected Records Deleted"};
           	  		helper.showToasts(component, params, event);
               		component.set("v.mydata",response.getReturnValue());
                if(type == 'single'){
                     component.set("v.ListForDelete",emptyList);   
                }else{
                    component.set("v.ListForUpdateSource",emptyList);   
                }
                    
				 }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action);
    },
    showToasts: function(component,params,event) {
    var errorToast = $A.get("e.force:showToast");
        if(params){
            errorToast.setParams(params);
        }
        errorToast.fire();
},
   /* deleteMethod:function(component, event, helper,recId,mode) {         
       var action = component.get("c.deleteRecord"); 
       var emptyList=[];  
             action.setParams({ recIdforDel : recId
                              }); 
            action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") { 
                	var params={ "title": "Success!",mode: 'sticky',type: "Success","message": "Record Deleted"};
           	  		helper.showToasts(component, params, event);
               		component.set("v.mydata",response.getReturnValue());
                	component.set("v.ListForUpdateSource",emptyList);
				 }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    var params={ "title": "Error!!",mode: 'sticky',type: "error",message: errors[0].message};
           	  		helper.showToasts(component, params, event);               		
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action);
    }*/
     
    
})