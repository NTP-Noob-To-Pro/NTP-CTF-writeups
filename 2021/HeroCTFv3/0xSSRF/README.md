# HeroCTF v3

## 0xSSRF
<br/>
<br/>

![challenge info](0xSSRF.png)

<br/>
<br/>

Going into this challenge we had the following page:

![main_page](main_page.png)

So from what we have is a proxy website allows us to fecth data from another website from it.
We also see that there is as link called "Get Flag" which unfortunatly returns:

![get_flag](get_flag.png)

So from what we can see we can only access the "Get Flag" from the localhost which is a problem.
We try to put the link via the proxy service which returns:

![test_proxy](test_proxy.png)

After some attemps to check different ways of using localhost ip we get to http://0:3000/flag which gives us the flag Hero{cl4ssic_SSRF_byP4pass_251094}

![flag_result](flag_result.png)
