/**
*
* @author  Govind Thathera
* @version 1.0
* @since   12/17/2018
* 
*/

public with sharing class AccountListController {
	/*
	 * Get recently modified top 15 accounts.
	 * 
	 */
    @AuraEnabled(cacheable=true)
    public static List<contact> Getcontacts() 
     {
         return [select id,name, account.name,email,Percent_Teaching_Time__c from contact where account.name <> null and Percent_Teaching_Time__c>0  limit 10];
     }
}