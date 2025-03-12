<#import "template.ftl" as layout>

<@layout.registrationLayout displayMessage=true; section>
    <#if section = "form">
        <div class="error-container">
            <div class="error-icon-wrapper">
                <span class="error-icon"></span>
            </div>
            <h2 class="error-title">${msg("errorTitle")}</h2>
            <p class="error-message">${message.summary}</p>
            
            <#if client?? && client.baseUrl?has_content>
                <p class="error-suggestion">${msg("errorSuggestion")}</p>
                <div class="error-actions">
                    <a href="${client.baseUrl}" class="btn btn-secondary">${msg("backToApplication")}</a>
                </div>
            <#else>
                <p class="error-suggestion">${msg("tryAgainSuggestion")}</p>
                <div class="error-actions">
                    <a href="${url.loginUrl}" class="btn btn-primary">${msg("doTryAgain")}</a>
                    <a href="https://www.bps.gub.uy" class="btn btn-secondary">${msg("returnToHome")}</a>
                </div>
            </#if>
            
            <div class="error-support">
                <p>${msg("errorSupportMessage")}</p>
                <p class="support-contact">${msg("errorSupportContact")}</p>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>