(function (Wishlist, $) {

  var $wishlistButton = $('.wishlist-btn');
  var $wishlistTile = $('.wishlist-tile-container');
  var $wishlistItemCount = $('.wishlist-item-count');
  var numProductTiles = $wishlistTile.length;
  var wishlist = localStorage.getItem('user_wishlist') || [];

  // debugger;

  if (wishlist.length > 0) {
    wishlist = JSON.parse(localStorage.getItem('user_wishlist'));
  }

  /*
   * Update button to show current state (gold for active)
   */   
  var animateWishlist = function (self) {
    $(self).toggleClass('is-active');
  };

  /*
   * Add/Remove selected item to the user's wishlist array in localStorage
   * Wishlist button class 'is-active' determines whether or not to add or remove
   * If 'is-active', remove the item, otherwise add it
   */   
  var updateWishlist = function (self) {
    var productHandle = $(self).attr('data-product-handle');
    var isRemove = $(self).hasClass('is-active');
    
    // debugger;

    /* Remove */
    if (isRemove) {
      console.log('remove');
      var removeIndex = wishlist.indexOf(productHandle);
      wishlist.splice(removeIndex, 1);
      localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
    }
    /* Add */ 
    else {
      console.log('addddd');
      wishlist.push(productHandle);
      localStorage.setItem('user_wishlist', JSON.stringify(wishlist));
    }
    console.log(JSON.stringify(wishlist));
  };

  /*
   * Loop through wishlist buttons and activate any items that are already in user's wishlist
   * Activate by adding class 'is-active'
   * Run on initialization
   */   
  var activateItemsInWishlist = function () {
    $wishlistButton.each(function () {
      var productHandle = $(this).attr('data-product-handle');
      if (wishlist.indexOf(productHandle) > -1) {
        $(this).addClass('is-active');
      }
    });
  };

  /*
   * Loop through product titles and remove any that aren't a part of the wishlist
   * Decrement numProductTiles on removal
   */   
  var displayOnlyWishlistItems = function () {
    $wishlistTile.each(function () {
      var productHandle = $(this).attr('data-product-handle');
      if (wishlist.indexOf(productHandle) === -1) {
        $(this).remove();
        numProductTiles--;
      }
    });
  };

  /*
   * Check if on the wishlist page and hide any items that aren't a part of the wishlist
   * If no wishlist items exist, show the empty wishlist notice
   */   
  var loadWishlist = function () {
//     if (window.location.href.indexOf('pages/wishlist') > -1) {
      displayOnlyWishlistItems();
      $('.wishlist-loader').fadeOut(2000, function () {
        $('.wishlist-grid').addClass('is_visible');
        $('.wishlist-hero').addClass('is_visible');
        if (numProductTiles == 0) {
          $('.wishlist-grid--empty-list').addClass('is_visible');
          $('.wishlist-grid').hide();
        
        } else {
          $('.wishlist-grid--empty-list').hide();
        }
      });
//     }
  };

  /**
   * Display number of items in the wishlist
   * Must set the $wishlistItemCount variable
   */
  var updateWishlistItemCount = function () {
    if (wishlist) {
      $wishlistItemCount.text(wishlist.length + ' item');
    }
  };

  var bindUIActions = function () {
    $wishlistButton.click(function (e) {
      e.preventDefault();
      setTimeout(function(){ window.location.href='/pages/wishlist'; }, 5000);
      if($(this).hasClass('is-active')){
      	$.notify({
        icon: 'fa fa-check',
        title: 'Success!',
        message: 'Item Successfully removed to your Wishlist',
        url: '/pages/wishlist',
        target: '_blank'
      },{
        element: 'body',
        position: null,
        type: "success",
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: true,
        placement: {
          from: "top",
          align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
      });
      } else {
      	$.notify({
        icon: 'fa fa-check',
        title: 'Success!',
        message: 'Item Successfully added to your Wishlist',
        url: '/pages/wishlist',
        target: '_blank'
      },{
        element: 'body',
        position: null,
        type: "success",
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: true,
        placement: {
          from: "top",
          align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
      });
      }  
      updateWishlist(this);
      animateWishlist(this);
    });
  };

  Wishlist.init = function () {
    bindUIActions();
    activateItemsInWishlist();
    loadWishlist();
    updateWishlistItemCount();
  };

}(window.Wishlist = window.Wishlist || {}, jQuery, undefined));