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

    // replace {%- -%} with {% %}
    textContent = textContent.replaceAll('{%-', '{%').replaceAll('-%', '%');

    // format {% comment %} inline comment {% endcoment %} to multi-line
    const commentPattern = /(\{\%.comment.\%\}).(.*).(\{\%.endcomment.\%\})/;
    const commentRegExp = new RegExp(commentPattern, 'gim');
    textContent = textContent.replaceAll(commentRegExp, (match, p1, p2, p3) => {
      return `${p1}\n\t${p2}\n${p3}`
    });

    // format {% capture %} inline capture {% endcpature %} to multi-line
    const capturePattern = /(\{\%.capture.\%\}).(.*).(\{\%.endcapture.\%\})/;
    const captureRegExp = new RegExp(capturePattern, 'gim');
    textContent = textContent.replaceAll(captureRegExp, (match, p1, p2, p3) => {
      return `${p1}\n\t${p2}\n${p3}`
    });

    // replace {% tags %} with blank
    textContent = textContent.replaceAll('{%','').replaceAll('%}','');

    // replace \n{{ }} with echo
    textContent = textContent.replaceAll('\n{{ ', 'echo ').replaceAll('\n{{', 'echo ').replaceAll('}}','');

    return `{%- liquid\n\t${textContent}\n-%}\n`;
  },
}