({
	 
	 deleteMethod:function(component, event, helper) {
       var action = component.get("c.deleteRecs");
        action.setParams({ "recId" : component.get("v.singleNode.Id") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") { 
                var listofRec=response.getReturnValue();
                component.set("v.maxLength",listofRec.length);
                component.set("v.selectedId",listofRec[0].Id);
				component.set("v.mydata",response.getReturnValue());
                component.set("v.inlineEdit",false);
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
    }
})