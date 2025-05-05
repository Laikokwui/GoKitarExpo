import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Pressable } from "./ui/pressable";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const postCard = (props: any) => {
    const { postID, postTitle, postContent, postImageUri, showEdit } = props;

    const router = useRouter();
    return (
        <Pressable style={styles.cardContainer} onPress={() => router.push({ pathname: '/post/details/[id]', params:{ id: postID }})}>
            { postImageUri === '' || postImageUri == null ? 
                <></>:
                <Image
                    source={{ uri: postImageUri }}
                    style={styles.image}
                />
            }
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {postTitle}
                </Text>
                <Text style={styles.content}>
                    {postContent}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 0,
        marginVertical: 10,
    },
    cardContent: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    content: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        textAlign: 'left',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
        marginBottom: 5,
        textAlign: 'left',
    },
});

export default postCard;