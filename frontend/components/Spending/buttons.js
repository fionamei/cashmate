import { TouchableOpacity, Image, Text } from 'react-native';

const rowOne = category1.map((c) =>
    <TouchableOpacity 
        key={c} 
        style={styles.roundButton}
        onPress={() => 
        {setModalVisible(!modalVisible)
        setCategory(c)
        setIsCategory(true)
        }}
        >
        <Image source={(iconArray[c])} style={styles.icons} />
        <Text style={styles.icontxt}>{c}</Text>
        
    </TouchableOpacity>
)
    
const rowTwo = category2.map((c) => 
    <TouchableOpacity 
        key={c} 
        style={styles.roundButton}
        onPress={() => 
        {setModalVisible(!modalVisible)
        setCategory(c)
        setIsCategory(true)
        }}
        >
        <Image source={(iconArray[c])} style={styles.icons}/>
        <Text style={styles.icontxt}>{c}</Text>
    </TouchableOpacity>
)

export { rowOne, rowTwo }