<#macro registrationLayout bodyClass="" displayInfo=false displayMessage=true displayRequiredFields=false showAnotherWayIfPresent=true>
<!DOCTYPE html>
<html class="${properties.kcHtmlClass!}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <link rel="stylesheet" href="${url.resourcesPath}/css/styles.css">
    <script src="${url.resourcesPath}/js/script.js" defer></script>
</head>

<body class="${properties.kcBodyClass!}">
    <div class="login-container">
        <div class="login-header">
            <img src="${url.resourcesPath}/img/bps-logo.svg" alt="BPS Logo" class="bps-logo">
            <h1>${msg("loginTitle", (realm.displayName!''))}</h1>
        </div>
        
        <div class="login-content">
            <#if displayMessage && message?has_content>
                <div class="alert alert-${message.type}">
                    <#if message.type = 'success'><span class="success-icon"></span></#if>
                    <#if message.type = 'warning'><span class="warning-icon"></span></#if>
                    <#if message.type = 'error'><span class="error-icon"></span></#if>
                    <#if message.type = 'info'><span class="info-icon"></span></#if>
                    <span class="message-text">${kcSanitize(message.summary)?no_esc}</span>
                </div>
            </#if>
            
            <#nested "form">
            
            <#if displayInfo>
                <div class="login-info">
                    <#nested "info">
                </div>
            </#if>
        </div>
        
        <div class="login-footer">
            <p>Banco de Previsión Social de Uruguay &copy; ${.now?string('yyyy')}</p>
            <p>Servicio de autenticación oficial</p>
        </div>
    </div>
</body>
</html>
</#macro>