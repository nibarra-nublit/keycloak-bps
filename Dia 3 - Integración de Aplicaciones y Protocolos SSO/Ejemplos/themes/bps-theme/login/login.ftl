<#import "template.ftl" as layout>

<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "form">
        <div id="kc-form">
            <div id="kc-form-wrapper">
                <form id="kc-form-login" onsubmit="return validateForm()" action="${url.loginAction}" method="post">
                    <div class="form-group">
                        <label for="username" class="form-label">${msg("username")}</label>
                        <input tabindex="1" id="username" class="form-control" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off" placeholder="${msg("usernameOrEmail")}" required />
                    </div>

                    <div class="form-group">
                        <label for="password" class="form-label">${msg("password")}</label>
                        <div class="password-input-wrapper">
                            <input tabindex="2" id="password" class="form-control" name="password" type="password" autocomplete="off" placeholder="${msg("password")}" required />
                            <button type="button" id="toggle-password" class="toggle-password" aria-label="Mostrar contraseña">
                                <span class="eye-icon"></span>
                            </button>
                        </div>
                    </div>

                    <div class="form-options">
                        <#if realm.rememberMe && !usernameEditDisabled??>
                            <div class="checkbox">
                                <label>
                                    <#if login.rememberMe??>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                    <#else>
                                        <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                    </#if>
                                </label>
                            </div>
                        </#if>
                        <#if realm.resetPasswordAllowed>
                            <div class="forgot-password">
                                <a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
                            </div>
                        </#if>
                    </div>

                    <div id="kc-form-buttons" class="form-buttons">
                        <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                        <button tabindex="4" class="btn btn-primary btn-block" type="submit">
                            ${msg("doLogIn")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <#if realm.password && social.providers??>
            <div id="kc-social-providers" class="social-providers">
                <hr />
                <h3>${msg("identity-provider-login-label")}</h3>
                <ul class="social-list">
                    <#list social.providers as p>
                        <li>
                            <a href="${p.loginUrl}" id="social-${p.alias}" class="social-link social-${p.providerId}">
                                <span class="social-icon social-icon-${p.providerId}"></span>
                                <span class="social-text">${p.displayName}</span>
                            </a>
                        </li>
                    </#list>
                </ul>
            </div>
        </#if>
    </#if>
</@layout.registrationLayout>