function import$(n,t){var i={}.hasOwnProperty;for(var e in t)i.call(t,e)&&(n[e]=t[e]);return n}var auth,x$;auth=function(n,t,i){var e=this;return this.mode=0,this.parent=i,n["tab.signup"].addEventListener("click",function(){return e.tab("signup")}),n["tab.login"].addEventListener("click",function(){return e.tab("login")}),n.action.addEventListener("click",function(){return e.signin(0===e.mode)}),this.listen("signout",function(){return e.signout()})},x$=auth,x$.controller="auth",import$(x$.prototype,{tab:function(n){var t,i,e;return t=["signup","login"],i=["註冊","登入"],this.mode=e=t.indexOf(n),helper.addClass(this.dom["tab."+t[e]],"active"),helper.removeClass(this.dom["tab."+t[1-e]],"active"),this.setText("action",i[e]),this.dom.displayname.style.display=e?"none":"block",this.dom.newsletter.style.display=e?"none":"block"},error:function(n,t){return this.setText("error."+n,t),helper.addClass(this.dom.model[n],"is-invalid"),this.running(!1)},running:function(n){return null==n&&(n=!0),helper.addClass(this.dom.action,"running"),helper.removeClass(this.dom.action,"running"),helper.toggleClass(this.dom.action,"running",n)},signout:function(){var n=this;return $.ajax({url:"/u/logout",method:"GET"}).done(function(){return n.parent.fire("signout.done")})},signin:function(n){var t=this;return null==n&&(n=!0),["email","displayname","passwd"].map(function(n){return helper.removeClass(t.dom.model[n],"is-invalid")}),/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(this.data.email)?n&&!this.data.displayname?this.error("displayname","這個欄位為必填"):this.data.passwd?this.data.passwd.length<4?this.error("passwd","密碼太弱"):(this.running(),$.ajax({url:n?"/u/signup":"/u/login",method:"POST",data:this.data}).done(function(n){return t.parent.fire("authpanel.off"),t.parent.fire("signin",n),t.running(!1)}).fail(function(i){return 403===i.status?n?t.error("email","已經註冊過了"):t.error("passwd","密碼不符"):t.error("email","系統問題，請稍候再試")})):this.error("passwd","這個欄位為必填"):this.error("email","這不是電子郵件")}});