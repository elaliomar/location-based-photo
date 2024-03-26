// import {View, Text, Pressable, FlatList} from 'react-native';
// import React, {useEffect, useState} from 'react';

// const Testing = () => {
//   const [loading, setLoading] = useState(false);
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(1);

//   const fetchItems = async () => {
//     setLoading(true);
//     const response = await fetch('https://artisanlb.net/api.php?page=' + page);
//     const responseJson = await response.json();
//     console.log(responseJson);
//     setPage(prev => prev + 1);
//     setItems([...items, ...responseJson]);
//     setLoading(false);
//   };
//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const ItemView = ({item}) => {
//     return (
//       <View>
//         <Text>{item.name}</Text>
//         <Text>{item.description}</Text>
//       </View>
//     );
//   };

//   const renderFooter = () => {
//     return (
//       <View>
//         <Pressable onPress={fetchItems}>
//           <Text>Load More</Text>
//         </Pressable>
//       </View>
//     );
//   };
//   return (
//     <View>
//       <FlatList
//         data={items}
//         renderItem={ItemView}
//         ListFooterComponent={renderFooter}
//       />
//     </View>
//   );
// };

// export default Testing;
