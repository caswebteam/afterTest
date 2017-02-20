'use strict';

function Denteez(options) {

    var conteinerForServices = document.getElementsByClassName('servicesWrap')[0],
        data;

    var numOfCards = options.numOfCards || null;


    function getData() {
        $.ajax({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', '337e2f6e0dcf7da587ad93e5a452fb3569314889');
            },
            headers: {
                'Authorization': '337e2f6e0dcf7da587ad93e5a452fb3569314889'
            },
            type: 'get',
            url: 'http://504080.com/api/v1/services/categories',
            crossDomain: true,
            dataType: '',
            success: function(results) {
                createCards(results);
            },
            error: function() {
                alert('NO');
            }
        });
    }

    function createCards(obj) {
        var arr = obj.data;

        function createSection() {
            // create nodes
            var section = document.createElement('section'),
                divWrapper = document.createElement('div'),
                divForImg = document.createElement('div'),
                img = document.createElement('img'),
                imgLink = document.createElement('a'),
                a = document.createElement('a');

            // add classes
            section.className = 'mainServices';

            divWrapper.className = 'mainServices__serviceWrap';

            divForImg.className = 'mainServices__serviceImg';

            img.className = 'mainServices__icon';

            imgLink.className = 'mainServices__imgLink';
            imgLink.href = '#';

            a.className = 'mainServices__serviceName';
            a.href = '#';

            // structuring of nodes
            divForImg.appendChild(img);
            divForImg.appendChild(imgLink);

            divWrapper.appendChild(divForImg);
            divWrapper.appendChild(a);

            section.appendChild(divWrapper);
            return {
            	section: section,
            	img: img,
            	a: a
            };
        }

        var section = (createSection()).section;

        function srcModificator(src) {
        	var modSrc = 'http:' + src;
        	return modSrc;
        }

        for (var i = 0, len = numOfCards || arr.length; i < len; i++) {

        	var src = arr[i].icon,
        		count = arr[i].count,
        		id = arr[i].id,
        		title = arr[i].title;

            // cloning of nodes is much faster than the creation of new elements
            var block = section.cloneNode(true);

            block.id = id;
            
            (block.getElementsByClassName('mainServices__icon')[0]).src = srcModificator(src);
            block.getElementsByClassName('mainServices__serviceName')[0].textContent = title;

            conteinerForServices.appendChild(block);
        }
    }

    function __init__() {
        getData();
    }

    this.__init__ = __init__;
}


