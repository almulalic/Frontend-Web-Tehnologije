let output = document.getElementById('output');

document.write("<table>");
document.write("<tr>");
document.write("<th class='zaglavlje'> X </th>");
for(let i=1;i<=10;i++)
    document.write("<th class='zaglavlje'>"+i+"</th>");
document.write("</tr>");

for(let i=1;i<=10;i++){
    document.write("<tr>");
    for(let j=1;j<=10;j++){
        if(j==1){
            document.write('<td class="zaglavlje">'+  i + '</td>');
            document.write('<td class="clanovi">'+  i*j + '</td>');
        }else
            document.write('<td class="clanovi">'+  i*j + '</td>');
    }
    document.write("</tr>");
}
document.write("</tr>");
document.write("</table>");