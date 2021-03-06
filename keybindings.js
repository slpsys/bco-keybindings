var MainPage = function () { 
  var self = this
  var indexKey = 'page-index'
  self.offset = 0
  if (localStorage.getItem(indexKey))
    self.offset = parseInt(localStorage.getItem(indexKey))
    self.dataDiv = $('.data:last')
    self.moveCursor = function(direction) {
    var newOffset = self.offset + direction
    if (newOffset >= 0 && newOffset <= self.dataDiv.children().length)
    {
      self.dataDiv.children(nthSelector(self.offset)).css('font-weight', 'normal')
      self.offset = newOffset
      localStorage.setItem(indexKey, self.offset)
      self.highlightCurrentOffset()
    }
  }
  self.loadPage = function() {
    window.location = currentDiv.find(nthSelector(self.offset) + ' li.subject a').prop('href')
  }
  self.highlightCurrentOffset = function() {
    self.dataDiv.children(nthSelector(self.offset)).css('font-weight', 'bold')
  }
  self.load = function() {
    self.highlightCurrentOffset()
    $(document).keydown(function (e) {
      switch(e.which) {
        case 74:
          self.moveCursor(1)
          break
        case 75:
          self.moveCursor(-1)
          break
        case 13:
          self.loadPage()
      }
    })
  }
}

function nthSelector(offset) {
  return ':nth-child(' + (offset + 1) + ')'
}

if (document.location.pathname === "/")
  new MainPage().load()
else
{
  var editing = false
  $('textarea').focus(function () { editing = true })
  $('textarea').blur(function () { editing = false })
  $(document).keydown(function (e) {
    if (e.which === 85 && !editing)
      window.location = "/"
  })
}