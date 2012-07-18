$(document).ready(function() {

	console.log("hi vishwa")
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
      console.log("in url")
      //$('.enterurl').css({'visibility':'hidden'})
      $('.enterurl').fadeOut("slow")
      $('.mainurl').css({'visibility':'visible'})
      $('.mainurl').show()
      $('.urlupload').animate({
        width:'500px'
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
          console.log("he",response.data[0].img_url_thumb)
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
      //"mouseout .img" : "onMouseOut"
    },

  	initialize : function() {
  		var self = this
  		_.bindAll(self,'render', 'renderOne', 'checklen')
      //var target = document.getElementById('spinicon');
      //console.log(target)
      console.log($('#spinicon')[0])
      spinner.spin($('#spinicon')[0])
  		self.collection.on('add', self.renderOne)
  		self.collection.on('reset', self.render)
  		self.collection.on('remove', self.checklen)
  		self.collection.fetch({success: function() { spinner.stop() } })
      //spinner.stop()
  	},

    onMouseClick : function(e) {
      var self = this
      console.log("here",$(e.target))
      var model_cid = $(e.target).attr('data-id')
      //console.log("hi",model_cid)
      var current_model = self.collection.getByCid(model_cid) 
      //console.log("her",current_model)
      //$(e.target).closest(".img").find("img").remove();
      $('.modal-body').html('')
      $('.modal-body').append("<img src='" + current_model.attributes.img_url+"'/>")
      $('#myModal').modal(show)
     // $(e.target).closest(".img").append("<img src='" + current_model.attributes.img_url+"'/>")

      // $(e.target).closest(".img").css({
      //   'overflow':'auto',
      //   // 'width': 'auto',
      //   // 'height': 'auto'
      // })
      // .find('img')
      // .attr('src',current_model.get('img_url'))
      //.css({'width': '500'})
    },

    // onMouseOut : function(e) {
    //   console.log("here")
    //   var self = this
    //   var model_cid = $(e.target).attr('data-id')
    //   console.log("hi",model_cid)
    //   var current_model = self.collection.getByCid(model_cid) 
    //   console.log("her",current_model.attributes)

    //   $(e.target).closest(".img").find("img:last").remove();
    //   // $(e.target).closest(".img").css({
    //   //   'overflow': 'hidden',
    //   //    'width' : '170px',
    //   //   'height' : '170px'
    //   // })
      
    // },

  	renderOne: function ( image ) {
  		var self = this
  		var imageView = new ImageItemView({ model: image })
      //spinner
      self.$el.append("<div class='img' data-toggle='modal' data-target='#myModal'><img class='i' src='" + image.get('img_url_thumb') +"' data-id='" +image.cid+"'/></div>")
      spinner.stop()   
  	},

  	render: function() {
  		var self = this,
  				template = ""
    
  		self.collection.each( function ( image ) {
  			var imageView = new ImageItemView({ model: image })
        console.log("image",image)
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
  		self.$el.removeClass('hover')
  		self.$el.css('background-color','white')
  		console.log("image received")
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
  	}, 

  	initialize: function () {
      console.log("hello")
  	}
  })//dragdrop

  var ImageItemView = Backbone.View.extend({
  	tagName: "p",

  	events: {
  		 "click": "onClickSelect",
  		 "click .selected .delete": "onClickDelete"
  	},

  	initialize: function () {
  		var self = this
  		
  	},

  	render: function () {
       console.log("img view render")
  		var self = this
  		self.$el.html("<img class='i' src='" + self.model.get('img_url') +"'/><div class ='delete'>Delete</div>")
  		return self
  	},

  	onClickSelect: function() {
  		var self = this
  		if (hist.length < 1) {
  			hist.push(self.$el)
  			self.$el.addClass('selected')
  		}
  		else {
  			var prev_dom = hist.shift()
  			hist = []
  			$(prev_dom).removeClass('selected')
  			hist.push(self.$el)
  			self.$el.addClass('selected')
  		}  		
  	},

  	onClickDelete : function() {
  		var self = this 
  		console.log("delete")
  		console.log(self.model)

  		console.log(self.model.collection.length)
  		//self.model.collection.remove(self.model);
  		self.model.destroy()
  		self.$el.remove()
  		
  	}

  })




	

	var hist = []
  //****************************************************************************************************

 var photos = [];
  

  console.log("in app",read_me);

  var opts = {
          lines: 12, // The number of lines to draw
          length: 7, // The length of each line
          width: 5, // The line thickness
          radius: 10, // The radius of the inner circle
          color: '#ff0000', // #rbg or #rrggbb
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
  //var mybox = new Myboxview({collection : Imgs})

  if (read_me == 0) {
    var mybox = new Myboxview({collection : Imgs})
    var footer_view = new FooterView({collection: Imgs})
    var drview = new DragDropView({collection: Imgs})
  }
   else{
    
    var req_url = window.location.pathname
    var req_token = req_url.split('/')[2]
    var id_url =[]
    $.ajax({
      url : "/getimages",
      type: "POST",
      data: {token:req_token},
      success: function(response) {
       console.log(response) 
       for(var i =0;i<response.length;i++) {
          $('.image-window').append("<div class='img' data-toggle='modal' data-target='#myModal'><img class='i' src='" + response[i].img_url_thumb +"' data-id='" + response[i].id+"' /></div>")
          id_url.push({id:response[i].id, img_url:response[i].img_url})
        }
      }         
    })     
    console.log("helllo",id_url)
    $('.img').live('click',function(e) {
      console.log("here",$(e.target))
      var img_id = $(e.target).attr("data-id")
      for(var i=0;i<id_url.length;i++) {
        if(img_id==id_url[i].id) {
          $('.modal-body').html('')
          $('.modal-body').append("<img src='" + id_url[i].img_url+"'/>")
          $('#myModal').modal(show)
        }
      }
      //var full_img_url = id_url[img_id]
      //console.log("full",img_id)
      // $('.modal-body').html('')
      // $('.modal-body').append("<img src='" + current_model.attributes.img_url+"'/>")
      // $('#myModal').modal(show)
      // $(e.target).closest(".img").css({
      //   'overflow':'auto',
      //   'width': 'auto',
      //   'height': 'auto'
      // })
      // .find('img')
      // .css({'width': '500'})
    })

    // $('.img').live('mouseout', function(e) {
    //   console.log("here")
    //   var self = this
    //   $(e.target).closest(".img").css({
    //     'overflow': 'hidden',
    //     'width' : '225px',
    //     'height' : '170px'
    //   })
    // })
  }
}) //close document