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
            timeout: 3000,
            success: function(results) {
                createCards(results);
            },
            error: function() {
                /*swal(
                  'Ой...',
                  'Не удалось получить данные из сервера, попробуйте еще раз!',
                  'error'
                )*/
                $('#modal').iziModal('open');
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

        $("#modal").iziModal({
            title: 'Ой...',
            subtitle: 'Не удалось получить данные из сервера, попробуйте еще раз!',
            headerColor: '#d43b3b',
            theme: '', // light
            attached: '', // bottom, top
            icon: null,
            iconText: null,
            iconColor: '',
            rtl: false,
            width: 600,
            padding: 0,
            radius: 3,
            zindex: 999,
            iframe: false,
            iframeHeight: 400,
            iframeURL: null,
            focusInput: true,
            group: '',
            loop: false,
            navigateCaption: true,
            navigateArrows: true, // closeToModal, closeScreenEdge
            history: true,
            restoreDefaultContent: false,
            autoOpen: 0, // Boolean, Number
            bodyOverflow: false,
            fullscreen: false,
            openFullscreen: false,
            closeOnEscape: true,
            overlay: true,
            overlayClose: true,
            overlayColor: 'rgba(0, 0, 0, 0.4)',
            timeout: 5000,
            timeoutProgressbar: true,
            pauseOnHover: false,
            timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
            transitionIn: 'comingIn',
            transitionOut: 'comingOut',
            transitionInOverlay: 'fadeIn',
            transitionOutOverlay: 'fadeOut',
            onFullscreen: function() {},
            onResize: function() {},
            onOpening: function() {},
            onOpened: function() {},
            onClosing: function() {},
            onClosed: function() {}
        });
        getData();
    }

    this.__init__ = __init__;
}
