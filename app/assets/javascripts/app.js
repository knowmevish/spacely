$(document).ready(function() {

	//backbone views on the side bar
  var FooterView = Backbone.View.extend ({

  	el: $('.bottom'),

  	events: {
  		"change '.fileinput" : "onClickUpload",
  		"submit #posturlForm" : "onUrlSubmit",
      "click .enterurl": "onClickUrl"
  	},

  	initialize : function() {
  		var self = this;
      $('.fileinput').css({
        'opacity':0,
        'visibility':'visible'
      })
  	},

    onClickUrl: function() {
      var self = this
      $('.enterurl').fadeOut("slow")
      $('.mainurl').css({'visibility':'visible'})
      $('.mainurl').show()
      $('.urlupload').animate({
        width:'400px'
      },1000,function() {})
    },

  	onClickUpload : function( e ) {
  		var self = this
  		e.preventDefault()
  		e.stopPropagation()
      spinner.spin($('#spinicon')[0])
  		var infile = document.getElementById('file')
  		var inform = document.getElementById('fileform')
  		var file = infile.files[0]
  		var formData = new FormData(inform)
  		formData.append('ourfile', file)
  		var xhr = new XMLHttpRequest()
   		xhr.onreadystatechange = function() {
	   		if(xhr.readyState === 4) {
			  	if (xhr.status === 200) {
			  		var response = JSON.parse(xhr.responseText)
            var new_img = new Image_model({
              "id": response.data[0].id,
              "img_url": response.data[0].img_url,
              "img_url_thumb": response.data[0].img_url_thumb
            })
	   				self.collection.add(new_img)
	   			}
	   		}
	   	}
	   	xhr.open('POST', '/images', true)
	   	xhr.send(formData)
  		return false
  	},

  	onUrlSubmit : function(e) {
  		var self = this
  		e.preventDefault()
  		e.stopPropagation()
      spinner.spin($('#spinicon')[0])
      $('.mainurl').fadeOut("slow")
      $('.enterurl').show()
  		var remote_url = document.getElementById('url').value
      $.ajax({
  			url : "/images",
  			type: "POST",
  			data: {url:remote_url},
  			success: function(response) {
	   			$('#url').val("")
    			var new_img = new Image_model({
    				"id": response.data[0].id,
    				"img_url": response.data[0].img_url,
            "img_url_thumb": response.data[0].img_url_thumb
          })
	   			self.collection.add(new_img)
  			}
  		})
  		return false
  	}
  });//footer closes

  var Myboxview = Backbone.View.extend({

  	el: $('.image-window'),

    events: {
      "click .img" : "onMouseClick",
    },

  	initialize : function() {
  		var self = this
  		_.bindAll(self,'render', 'renderOne', 'checklen')
      spinner.spin($('#spinicon')[0])
  		self.collection.on('add', self.renderOne)
  		self.collection.on('reset', self.render)
  		self.collection.on('remove', self.checklen)
  		self.collection.fetch({success: function() { spinner.stop() } })
  	},

    onMouseClick : function(e) {
      var self = this
      $('.modal-body').empty()
      spinner.spin($('#spinmodal')[0])
      var model_cid = $(e.target).attr('data-id')
      var current_model = self.collection.getByCid(model_cid) 
      showimage(current_model.attributes.img_url)
    },

  	renderOne: function ( image ) {
  		var self = this
      //spinner
      self.$el.append("<div class='img' data-toggle='modal' data-target='#myModal'><img class='i' src='" + image.get('img_url_thumb') +"' data-id='" +image.cid+"'/></div>")
      spinner.stop()   
  	},

  	render: function() {
  		var self = this,
  				template = ""
    
  		self.collection.each( function ( image ) {
        self.$el.append("<div class='img' data-toggle='modal' data-target='#myModal'><img class='i' src='" + image.get('img_url_thumb') +"' data-id='" +image.cid+"'/></div>")
  		})
     spinner.stop()
  	},
  	
  	checklen : function(coll) {
  		var self = this
  	} 
  });//myboxview

  var DragDropView = Backbone.View.extend({
  	
  	el: $('.image-window'),

  	events: {
  		 "dragover": "onDragOver",
  		 "dragleave": "onDragLeave",
  		 "drop": "onDropImage"
  	},

  	onDragOver : function() {
  		var self = this
  		self.$el.addClass('hover')
  		self.$el.css('background-color','red')
  		return false
  	},

  	onDragLeave : function() {
  		var self = this
  		self.$el.removeClass('hover')
  		self.$el.css('background-color','white')
  		return false
  	},

  	onDropImage : function(e) {
  		var self = this
  		e.preventDefault()
  		e.stopPropagation()
      spinner.spin($('#spinicon')[0])
  		self.$el.removeClass('hover')
  		self.$el.css('background-color','white')
  		var img_data = e.originalEvent.dataTransfer.files
  		var file = img_data[0]
  		var inform = document.getElementById('drform')
  		var formData = new FormData(inform)
  		formData.append('ourfile', file)
  		var xhr = new XMLHttpRequest()
   		xhr.onreadystatechange = function() {
	   		if(xhr.readyState === 4) {
			  	if (xhr.status === 200) {
			  		var response = JSON.parse(xhr.responseText)
            var new_img = new Image_model({
              "id": response.data[0].id,
              "img_url": response.data[0].img_url,
              "img_url_thumb": response.data[0].img_url_thumb
            })
	   				self.collection.add(new_img)
	   			}
	   		}

			}
			xhr.open('POST', '/images', true)
	   	xhr.send(formData)
  		return false
  	}
  })//dragdrop

 var opts = {
          lines: 12, // The number of lines to draw
          length: 7, // The length of each line
          width: 2, // The line thickness
          radius: 5, // The radius of the inner circle
          color: '#000', // #rbg or #rrggbb
          speed: 1, // Rounds per second
          trail: 66, // Afterglow percentage
          shadow: true // Whether to render a shadow
  }

  var spinner = new Spinner(opts)

  $('.fbshare').click(function(e) {
    e.preventDefault()
    var self = this
    var cur_path = window.location.href
    var fburl = "http://www.facebook.com/sharer.php?u=" + cur_path
    var width = 575,
    height = 400,
    left = ($(window).width() - width) / 2,
    top = ($(window).height() - height) / 2,
    url = this.href,
    opts = 'status=1' +
    ',width=' + width +
    ',height=' + height +
    ',top=' + top +
    ',left=' + left 
    window.open(fburl, 'facebookpop', opts)
    return false;
  })

  var Image_model = Backbone.Model.extend({
    defaults: {
      "id": "-1",
      "img_url" : "/temp",
      "img_url_thumb": "/temp1"
    }
  }) // model ends

  var Images_collection = Backbone.Collection.extend({
    model : Image_model,
    url : '/images'
  })

  var Imgs = new Images_collection()
  var Img = new Image_model();

  if (read_me == 0) {
    var mybox = new Myboxview({collection : Imgs})
    var footer_view = new FooterView({collection: Imgs})
    var drview = new DragDropView({collection: Imgs})
  }
  else {
    var req_url = window.location.pathname
    var req_token = req_url.split('/')[2]
    var id_url =[]
    $.ajax({
      url : "/getimages",
      type: "POST",
      data: {token:req_token},
      success: function(response) {
       for(var i =0;i<response.length;i++) {
          $('.image-window').append("<div class='img' data-toggle='modal' data-target='#myModal'><img class='i' src='" + response[i].img_url_thumb +"' data-id='" + response[i].id+"' /></div>")
          id_url.push({id:response[i].id, img_url:response[i].img_url})
        }
      }         
    })     
    $('.img').live('click',function(e) {
      $('.modal-body').html('')
      spinner.spin($('#spinmodal')[0])
      var img_id = $(e.target).attr("data-id")
      for(var i=0;i<id_url.length;i++) {
        if(img_id==id_url[i].id) {
          showimage(id_url[i].img_url)
        }
      }
    })
  }

  function showimage(img_url) {
    var img_height
    var img_width
    var img_tag = new Image()
    img_tag.src = img_url
    $(img_tag).load(function() {
      if(img_tag.height<500) {
        img_height = img_tag.height
      }
      else {
        img_height = 500
      }
      if (img_tag.width < 800) {
        img_width = img_tag.width
      }
      else {
        img_width = 800
      }    
      $(img_tag).css({'width':img_width,'height':img_height})
      $('.modal-body').css({'text-align': 'center'})
      $('.modal-body').append($(img_tag))
      spinner.stop()
       $('#myModal').modal('show')
    })
  }

}) //close document