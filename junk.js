// <%- include("partials/footers") -%>
// <% for ( i = 0; i < glo.length; i++) { %>
// <% console.log(glo[i].coTitle) %>
// <% } %>
// <% console.log(element.coTitle) %>
// <% console.log(element.coBody) %>
app.get("/tests/:values", (request, response) => {
    for ( i = 0; i < global.length; i++) { 
  const answer = global[i].coTitle;
  if( request.params.values === answer){
console.log("Match");
  }
  else{
    console.log("No Match")
  }
 } 
})
//Always Check Google for Truncate String Javascript.
//how to use lodash to truncate a string.