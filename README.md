# CapgemaniHackathon
Application source code 

Description
Develop a salesforce lightning experience where user navigates to an account homepage. Which displays list of account records. User can select multiple records in list by clicking checkboxes. User should be able to update ‘Account Source’ for these selected records at once by clicking ‘Update Account Source’ button on homepage. User should be able to delete multiple records in list at once by clicking ‘Delete’ button.

Data and Code Models
This sample application uses Account standard object which is available OUT of BOX.

We want to implement following functionality:

1.	In Salesforce Lightning application user navigates to account home page 
2.	This should display:

	List of account records with checkboxes
	‘Update Account Source’ Button
	‘Delete’ button

3.	Following fields should be displayed in list:

	Account Name 
	Account Number
	Account Owner
	Account Source
	Annual Revenue
	Type
	Industry
	Created By

Mass Update

4.	User selects multiples records in list using checkboxes. 
5.	User clicks ‘Update Account Source’ button.
6.	A pop-up window appears which displays a picklist for ‘Account Source’ and list of records selected in step 4.
7.	User selects a new value from ‘Account Source’ drop down and clicks update button in pop-up.

8.	The list should refresh and show the list of records with updated value. 

Mass Delete

9.	User selects multiples records in list using checkboxes. 
10.	Clicks the Delete button. A confirmation pop-up should appear for deletion.
11.	After confirming delete the record should be deleted, and list of records should be refreshed. 

Technical Description:
	Create Server-Side Apex Controller to retrieve the records. 
	Create Custom Lightning Component where it loads the records using init handler on loading with Check boxes and ‘Update Account Source’ and ‘Delete’ button.
	Select multiple records in list.
	Click ‘Update Account Source’. 
	A pop-up window appears which displays a picklist for ‘Account Source’ and list of records selected. 
	User selects a new value from ‘Account Source’ drop down and clicks update button in pop-up.
	The screen refresh and show the list of records with updated record also.
	Click Delete button. 
	Write a JavaScript controller with two functions, one for Update Account Source and  the other function to delete the selected records. 
	Create Lightning App to include the component and display. 




