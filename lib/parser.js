// regex pattern for liquid: https://github.com/panoply/vscode-liquid/blob/638eb12ef736bdad9563f2cc7ee809b502dbfbfd/src/extension/pattern.js#L33
// todo; how to handle HTML ?
/*
  {% assign foo = bar %}
  <html>
    <h1>hey</h1>
  </html>

  should be converted to:

  {%- liquid 
    assign foo = bar
  -%}
  <html>
    <h1>hey</h1>
  </html>

  instead of
  {%- liquid 
    assign foo = bar  
    <html>
      <h1>hey</h1>
    </html>
  -%}
*/
module.exports = {
  parseText: function(textContent) {
    return `{%- liquid\n\t${textContent.replaceAll('{%-', '{%').replaceAll('-%}', '%}').replaceAll('{%','').replaceAll('%}','').replaceAll('\n{{ ', 'echo ').replaceAll('\n{{', 'echo ').replaceAll('}}','')}\n-%}\n`;
  }
}