var prodList;
var tableList;
(function($) {
  
  "use strict";  
 
  $(window).on('load', function() {

  /*Page Loader active
  ========================================================*/
  // $('#preloader').fadeOut(); - уберу загрузку страницы


  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });

    // one page navigation 
    $('.navbar-nav').onePageNav({
      currentClass: 'active',
      filter: '.scroll-link'
    });

    /* Auto Close Responsive Navbar on Click
    ========================================================*/
    function close_toggle() {
        if ($(window).width() <= 768) {
            $('.navbar-collapse a').on('click', function (event) {
              if(event.target.classList.contains("dropdown-toggle")){ 
                return; }
                $('.navbar-collapse').collapse('hide');
            });
        }
        else {
            $('.navbar .navbar-inverse a').off('click');
            
            
        }
    }
    close_toggle();
    $(window).resize(close_toggle);

    

    /* WOW Scroll Spy
    ========================================================*/
    //  var wow = new WOW({
    //   //disabled for mobile
    //     mobile: false
    // });

    // wow.init();

    /* 
    CounterUp
    ========================================================================== */
    $('.counter').counterUp({
      time: 500
    });  

    // Product list
    // ========================================================================== 
    if($("#productList").length>0){
      var options = {
        valueNames: [ 'name', 'code1', "cat", "prim" ],
        page: 50,
        pagination: true
      };
      prodList = new List('productList', options);
      $("#loading-panel").css("display", "none");
      $("#productList").css("display", "block");
      
      prodList.on('updated', function(list) {
        if (list.matchingItems.length > 0) {
          $('.no-result').hide()
        } else {
          $('.no-result').show()
        }
      });

      
        $('#pListSearch').on('input', function() {
          filterProductList($('#pListSearch').val());
        });
      
      
        var hash = decodeURIComponent($(location).attr('hash')).replace("#","");
        if (hash) {
          $('#pListSearch').val(hash)
          filterProductList(hash);
        }
    }

    // KOD list
    // ==========================

    if($("#table-list").length>0){
      
      tableList = new List('table-list', {
        valueNames : [ 'code1', 'code2', 'code3', 'code4' ]
        , searchDelay : 350,
        indexAsync : true

      });
      $("#loading-panel").css("display", "none");
      //$("#kodList").css("display", "block");
      
      tableList.on('updated', function(list) {
        if (list.matchingItems.length > 0) {
          $('.no-result').hide()
        } else {
          $('.no-result').show()
        }
      });

      
        // $('#pKodSearch').on('input', function() {
        //   filterKodList($('#pKodSearch').val());
        // });
      
    }
    function filterKodList(text) {
        if (tableList) {
          if (text.length >= 2) {
            tableList.search(text);
          }
          else{
            tableList.search("");
          }
        }
    }
    

     /* Testimonials Carousel 
    ========================================================*/
    if ($("#testimonials").length > 0) {
    var owl = $("#testimonials");
      owl.owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        center: true,
        margin: 15,
        slideSpeed: 500,
        stopOnHover: true,
        autoPlay: true,
        responsiveClass: true,
        responsiveRefreshRate: true,
        responsive : {
            0 : {
                items: 1
            },
            768 : {
                items: 2
            },
            960 : {
                items: 3
            },
            1200 : {
                items: 3
            },
            1920 : {
                items: 3
            }
        }
      });  
      
    }

    /* Back Top Link active
    ========================================================*/
      var offset = 200;
      var duration = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });


      // The function actually applying the offset
      function offsetAnchor() {
        if (location.hash.length !== 0) {
          window.scrollTo(window.scrollX, window.scrollY - 100);
        }
      }

      // Captures click events of all <a> elements with href starting with #
      $(document).on('click', 'a[href^="#"]', function(event) {
        // Click events are captured before hashchanges. Timeout
        // causes offsetAnchor to be called after the page jump.
        window.setTimeout(function() {
          offsetAnchor();
        }, 0);
      });

      // Set the offset when entering page with hash present in the url
      window.setTimeout(offsetAnchor, 0);

      

      // $('<link/>', { rel: 'stylesheet', href: 'http://zap-kam.ru/assets/css/iframe.css', type: 'text/css' })
      $('#form1').each(function () {
        function injectCSS() {
          $iframe.contents().find('head').append(
            " <style> .footer_view_iframe {  display: none !important; } .survey__line { margin-bottom: 0px !important; }  .input.input_type_textarea { height: 4em;} </style> "
          );
        }  
        var $iframe = $(this);
        $iframe.on('load', injectCSS());
        injectCSS();
      });




    // Корзина
    $.jqCart({
        buttons: '.add_item',        // селектор кнопок, аля "Добавить в корзину"
        handler: '/php/handler.php', // путь к обработчику
        visibleLabel: false,         // показывать/скрывать ярлык при пустой корзине (по умолчанию: false)
        openByAdding: false,         // автоматически открывать корзину при добавлении товара (по умолчанию: false)
        currency: '&#8381;',          // валюта: строковое значение, мнемоники (по умолчанию "$")
        cartLabel: '.label-place'    /* селектор элемента, где будет размещен ярлык, 
                                        он же - "кнопка" для открытия корзины */
    });
    // дополнительные методы
    //$.jqCart('openCart'); // открыть корзину
    // $.jqCart('clearCart'); // очистить корзину

    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();


    $('.breadcrumb-item a').on('click', function () {
      var targetLink = $(this).attr('href'); 
      var win = window.open(targetLink, '_self');
      win.focus();
    });


    // dropdown-item

  }); // on_load     

}(jQuery));

// LAZY LOAD =======================================================================

// var lazyload = lazyload || {};
 
// (function($, lazyload) {
 
//     "use strict";
 
//     var page = 2,
//         buttonId = "#moreButton",
//         loadingId = "#loadingDiv",
//         container = "#productList.list-group";
 
//     lazyload.load = function(url) {
 
//         var url = url + page + ".html";
 
//         $(buttonId).hide();
//         $(loadingId).show();
 
//         $.ajax({
//             url: url,
//             success: function(response) {
//                 if (!response || response.trim() == "NONE") {
//                     $(buttonId).fadeOut();
//                     $(loadingId).text("Список полностью загружен");
//                     return;
//                 }

//                 var options = {
//                   valueNames: [ 'name' ],
//                   page: 50,
//                   pagination: true
//                 };

//                 $(buttonId).hide();
//                 $(loadingId).hide();
//                 $(response).appendTo($(container));
//                 prodList = new List('productList', options);
//             },
//             error: function(response) {
//                 $(loadingId).text("К сожалению, возникла какая-то ошибка при запросе. Пожалуйста, обновите страницу.");
//             }
//         });
//     };

 
// })(jQuery, lazyload);


function filterProductList(text){
  if(prodList){
      // if(text.length > 2 ){
        prodList.search(text);
      // }
  }
  
}

function request_form_yandex(p_id, text) {

  var tx = ''; var pars = '';
  if (($('#pr1_' + p_id).is(':checked') != true) && ($('#pr2_' + p_id).is(':checked') != true)
    && ($('#pr3_' + p_id).is(':checked') != true) && ($('#pr4_' + p_id).is(':checked') != true)
    && ($('#pr5_' + p_id).is(':checked') != true) && ($('#pr6_' + p_id).is(':checked') != true)
    && ($('#pr7_' + p_id).is(':checked') != true) && ($('#pr8_' + p_id).is(':checked') != true) 
    && ($('#pr9_' + p_id).is(':checked') != true) && ($('#pr10_' + p_id).is(':checked') != true) 
    ) {
    $('#pr1_' + p_id).prop('checked', true);
  }
  if ($('#pr1_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr1_' + p_id).data('title') +" "+ $('#pr1_' + p_id).data('id') + " / "+ $('#pr1_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }
  if ($('#pr2_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr2_' + p_id).data('title') +" "+ $('#pr2_' + p_id).data('id') + " / "+ $('#pr2_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }
  if ($('#pr3_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr3_' + p_id).data('title') +" "+ $('#pr3_' + p_id).data('id') + " / "+ $('#pr3_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }
  if ($('#pr4_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr4_' + p_id).data('title') +" "+ $('#pr4_' + p_id).data('id') + " / "+ $('#pr4_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }
  if ($('#pr5_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr5_' + p_id).data('title') +" "+ $('#pr5_' + p_id).data('id') + " / "+ $('#pr5_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }
  if ($('#pr6_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr6_' + p_id).data('title') +" "+ $('#pr6_' + p_id).data('id') + " / "+ $('#pr6_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }
  if ($('#pr7_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr7_' + p_id).data('title') +" "+ $('#pr7_' + p_id).data('id') + " / "+ $('#pr7_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }
  if ($('#pr8_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr8_' + p_id).data('title') +" "+ $('#pr8_' + p_id).data('id') + " / "+ $('#pr8_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }
  if ($('#pr9_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr9_' + p_id).data('title') +" "+ $('#pr9_' + p_id).data('id') + " / "+ $('#pr9_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }
  if ($('#pr10_' + p_id).is(':checked') == true) { tx = tx + "• " + $('#pr10_' + p_id).data('title') +" "+ $('#pr10_' + p_id).data('id') + " / "+ $('#pr10_' + p_id).data('price') + "р. / "+ '  (' + text + ')\n'; }

  if (tx != '') { pars = pars + '&answer_long_text_1877903=' + encodeURIComponent(tx + '\n- '); }

  pars = 'https:' + '/' + '/forms.yandex.ru/u/5e5831b56296cf035c59867f/?iframe=1' + pars+'&answer_url_13308679=korzina';
  document.getElementById('form1').src = pars;

  ym(57702985, 'reachGoal', 'RequestBill');
  return true;
}

function copyToClipboard(text, mess) {
  var input = document.createElement('textarea');
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  $('#copy_mess').empty().show().html(mess).delay(3000).fadeOut(300);
  return result;
}

function add_to_cart(p_id, text) {

  var tx = ''; var pars = '';
  if (($('#pr1_' + p_id).is(':checked') != true) && ($('#pr2_' + p_id).is(':checked') != true)
    && ($('#pr3_' + p_id).is(':checked') != true) && ($('#pr4_' + p_id).is(':checked') != true)
    && ($('#pr5_' + p_id).is(':checked') != true) && ($('#pr6_' + p_id).is(':checked') != true)
    && ($('#pr7_' + p_id).is(':checked') != true) && ($('#pr8_' + p_id).is(':checked') != true)
    && ($('#pr9_' + p_id).is(':checked') != true) && ($('#pr10_' + p_id).is(':checked') != true)
    ) {
    $('#pr1_' + p_id).prop('checked', true);
  }
  if ($('#pr1_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr1_' + p_id) );  }
  if ($('#pr2_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr2_' + p_id) );  }
  if ($('#pr3_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr3_' + p_id) );  }
  if ($('#pr4_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr4_' + p_id) );  }
  if ($('#pr5_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr5_' + p_id) );  }
  if ($('#pr6_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr6_' + p_id) );  }
  if ($('#pr7_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr7_' + p_id) );  }
  if ($('#pr8_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr8_' + p_id) );  }
  if ($('#pr9_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr9_' + p_id) );  }
  if ($('#pr10_' + p_id).is(':checked') == true) { $.jqCart('addToCartJs', $('#pr10_' + p_id) );  }

  
  ym(57702985, 'reachGoal', 'InCart');
  return true;
}