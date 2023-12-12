const NewsThumb = () => {
  return (
    <div className="news-detail-thumb">
        <div className="news-image">
              <img src="images/news-image3.jpg" className="img-responsive" alt="" />
        </div>
        <h3>Review Annual Medical Research</h3>
        <p>Aenean molestie porttitor lorem sed semper. Aliquam semper iaculis libero, eu finibus ex euismod at. In molestie justo ut egestas porttitor. Phasellus interdum erat eu lectus condimentum euismod. Sed pellentesque fringilla diam vitae congue. Ut rutrum diam nisi, in maximus felis vulputate vitae.</p>
        <blockquote>Vestibulum gravida rutrum est non volutpat. Morbi imperdiet odio ut tempor vestibulum. Mauris tincidunt vehicula nibh, sodales vehicula erat imperdiet ut.</blockquote>
        <p>Maecenas eu lorem gravida nisi aliquam porta. Etiam eu tellus enim. Vivamus ligula ex, iaculis a sodales et, placerat eget neque. In porttitor tortor in purus commodo lobortis. Nullam ornare quam ac turpis luctus, commodo facilisis nisi venenatis. Cras a posuere risus.</p>
        
        <ul>
              <li>Phasellus posuere nisi eleifend, vestibulum ipsum eleifend</li>
              <li>Nulla sapien neque, posuere vitae porta eu</li>
              <li>Fusce quis enim vel libero pulvinar gravida sed eu justo</li>
        </ul>

        <p>Nunc eget ex sed nisl rhoncus lacinia. Vestibulum porta lectus at est placerat, nec commodo purus dignissim. Suspendisse ac quam in metus laoreet auctor ac quis enim.</p>
        <div className="news-social-share">
              <h4>Share this article</h4>
                  <a href="#" className="btn btn-primary"><i className="fa fa-facebook"></i>Facebook</a>
                  <a href="#" className="btn btn-success"><i className="fa fa-twitter"></i>Twitter</a>
                  <a href="#" className="btn btn-danger"><i className="fa fa-google-plus"></i>Google+</a>
        </div>
    </div>
  )
}

export default NewsThumb;