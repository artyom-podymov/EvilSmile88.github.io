<%@ WebHandler Language="C#" Class="PostHandler" %>

using System;
using System.Web;

public class PostHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        
        // Чтение POST данных.
        string aParam = context.Request.Form["num1"];
        string bParam = context.Request.Form["num2"];
        int i = Convert.ToInt32(aParam)+Convert.ToInt32(bParam);
        
        

        // Формирование ответа.
        context.Response.Write("Result = " + i);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}