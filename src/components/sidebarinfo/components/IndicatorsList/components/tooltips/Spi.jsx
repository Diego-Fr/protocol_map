const Spi = (current) =>{
    return <div>
        <table style={{minWidth: '150px'}}>
            <thead style={{textAlign: 'center'}}>
                <tr>
                    <th>Limiar</th>
                    <th>Estágio</th>
                </tr>
            </thead>
            <tbody style={{textAlign: 'center'}}>
                <tr style={{backgroundColor: 'red'}}>
                    <td>-1,282 a -0,524</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>-1,645 a -1,283</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>-2,326 a -1,646</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>-2,326</td>
                    <td>4</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default Spi