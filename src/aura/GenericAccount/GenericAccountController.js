({
	handleLoad : function(component, event, helper) {
		component.set("v.showSpinner",false);
	},
    onCancel: function(component, event, helper) {
		component.set("v.showSpinner",false);
	},
    onSubmit:function(component, event, helper) {
		component.set("v.showSpinner",false);
	},
 	onSuccess:function(component, event, helper) {
		component.set("v.showSpinner",false);
	}
})