document.addEventListener("DOMContentLoaded",function(){const links=document.querySelectorAll('a');links.forEach(function(link){if(link.host!==window.location.host&&'_blank'===link.getAttribute('target')){const existAttr=link.getAttribute('rel');link.setAttribute('rel','noreferrer noopener'+(existAttr&&'noopener'!==existAttr?' '+existAttr:''));}});});