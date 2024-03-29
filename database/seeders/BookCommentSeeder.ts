import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'
import User from 'App/Models/User';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
    public async run() {
        // Write your database queries inside the run method

        function randomIntWithProbability(): number {
            const randomNumber = Math.random();

            if (randomNumber < 0.7) {
                // 70% probability for 4 or 5
                return Math.floor(Math.random() * 2) + 4;
            } else {
                // 30% probability for 1, 2, or 3
                return Math.floor(Math.random() * 3) + 1;
            }
        }

        function getRandomElementsFromArray(arr: string[]): string[] {
            const minCount = 5;
            const maxCount = 30;

            const randomCount = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

            // Shuffle the array
            const shuffledArray = arr.sort(() => Math.random() - 0.5);

            // Slice the array to get the random elements
            const randomElements = shuffledArray.slice(0, randomCount);

            return randomElements;
        }

        function getRandomObject<T>(array: T[]): T | undefined {
            const randomIndex = Math.floor(Math.random() * array.length)
            return array[randomIndex]
        }


        const commentArr = [
            "Cuốn sách này thực sự là một nguồn cảm hứng lớn về cuộc sống và sự thành công.",
            "Tác giả đã truyền đạt ý nghĩa sâu sắc thông qua từng trang sách.",
            "Nội dung phong phú, đưa độc giả đến những chân trời mới của tri thức.",
            "Sách giúp mở mang tâm hồn và mở rộng kiến thức về nhiều lĩnh vực.",
            "Câu chuyện được kể một cách lôi cuốn, khiến bạn không thể bỏ sách ra khỏi tay.",
            "Tôi học được rất nhiều từ cuốn sách này, không chỉ về kiến thức mà còn về bản thân mình.",
            "Ngôn ngữ sáng tạo, hấp dẫn, làm cho việc đọc trở nên thú vị hơn bao giờ hết.",
            "Sự nghiên cứu kỹ lưỡng và chứng minh minh bạch làm cho sách trở thành nguồn tham khảo đáng tin cậy.",
            "Mỗi trang sách đều chứa đựng những điều bất ngờ và ý tưởng mới.",
            "Tác phẩm này thực sự là một bảo bối với những người muốn phát triển bản thân.",
            "Sách mang lại cái nhìn mới mẻ về thế giới xung quanh.",
            "Nội dung sâu sắc, giúp độc giả suy ngẫm và tự hỏi về nhiều khía cạnh của cuộc sống.",
            "Khả năng mô tả tuyệt vời, tạo nên hình ảnh sống động trong tâm trí người đọc.",
            "Tác giả đã chọn lọc rất kỹ lưỡng những thông điệp quan trọng nhất để truyền đạt.",
            "Sách là một hành trình tuyệt vời, từ trang đầu đến trang cuối.",
            "Dù đã đọc nhiều sách, nhưng cuốn này vẫn là một trải nghiệm độc đáo và khó quên.",
            "Tích hợp tinh tế giữa giảng dạy và giải trí, làm cho việc học trở nên thú vị.",
            "Nội dung không chỉ làm giàu tri thức mà còn là nguồn động viên lớn.",
            "Cuốn sách là một món quà tuyệt vời cho bất kỳ ai muốn đổi mới trong cuộc sống.",
            "Tôi cảm thấy như mình đã sống qua hàng trăm cuộc phiêu lưu khi đọc xong cuốn sách này.",
            "Sự sáng tạo của tác giả là không giới hạn, làm cho nội dung trở nên rất độc đáo.",
            "Đọc sách giống như một cuộc phiêu lưu, mỗi trang đều là một chặng đường mới.",
            "Nói chung, cuốn sách này là một tác phẩm nghệ thuật.",
            "Sự kết hợp hoàn hảo giữa tri thức và giải trí.",
            "Khả năng kể chuyện tuyệt vời, khiến cho mỗi câu chuyện trở nên sống động.",
            "Sách thậm chí còn tốt hơn những gì tôi mong đợi, làm tăng thêm sự hài lòng.",
            "Tôi đã tìm thấy câu trả lời cho nhiều câu hỏi của mình trong cuốn sách này.",
            "Ngôn ngữ dễ hiểu, phù hợp với mọi độc giả, không phân biệt trình độ.",
            "Nó không chỉ là một cuốn sách, mà là một nguồn động viên mỗi ngày.",
            "Sự pha trộn tuyệt vời giữa hài hước và triết lý cuộc sống.",
            "Đọc sách này giống như được người bạn đồng hành tốt nhất dẫn dắt trong cuộc đời.",
            "Mỗi dòng văn đều chứa đựng sức mạnh của tri thức và sự sâu sắc của tâm hồn.",
            "Cuốn sách này là một hành trình tinh thần không thể bỏ qua.",
            "Tôi đã đọc lại nhiều lần và vẫn tìm thấy những điều mới mẻ.",
            "Tác giả đã tạo nên một thế giới riêng biệt, đầy màu sắc và ý nghĩa.",
            "Sách không chỉ làm cho tôi cười, mà còn khiến tôi khóc và suy ngẫm.",
            "Mỗi trang sách đều chứa đựng một kho tàng kiến thức khổng lồ.",
            "Tôi cảm thấy như mình đã trải qua một hành trình tâm linh khi đọc xong.",
            "Sự chân thật và tranh cãi của nội dung khiến cho sách trở nên đặc sắc.",
            "Đọc sách này giống như một cuộc phiêu lưu tìm kiếm ý nghĩa cuộc sống.",
            "Tác giả không chỉ là một người viết sách, mà là một người hướng dẫn tâm linh.",
            "Cuốn sách này là nguồn động viên mạnh mẽ để vượt qua khó khăn.",
            "Nội dung sâu sắc và thấu hiểu sâu rộng về con người và xã hội.",
            "Sự linh hoạt trong việc truyền đạt thông điệp làm cho sách trở nên hấp dẫn.",
            "Tôi cảm thấy như mình đã tìm thấy đốm sáng ở cuối đường hầm khi đọc xong.",
            "Sách giúp tôi mở rộng tầm nhìn và định hình lại mục tiêu cuộc sống.",
            "Nó không chỉ là một cuốn sách, mà là một nguồn động viên mỗi ngày.",
            "Sự chân thực và triết lý sâu sắc làm cho sách trở nên đặc biệt.",
            "Cuốn sách này là một chuyến phiêu lưu tuyệt vời qua biển kiến thức.",
            "Tôi cảm thấy như mình đang nói chuyện trực tiếp với tác giả qua từng trang sách.",
            "Nội dung của cuốn sách này là một hỗn hợp phức tạp của hành động và tâm lý.",
            "Sự kết hợp tinh tế giữa hồi hộp và sự chân thực, làm cho đọc sách trở nên khó quên.",
            "Tác giả đã tạo ra một thế giới huyền bí và đầy thách thức, khiến tôi muốn đọc mãi.",
            "Sự sáng tạo của tác giả nằm ở cách ông ta đặt ra những câu hỏi khó khăn nhưng hấp dẫn.",
            "Nội dung của sách không chỉ là giải trí mà còn làm cho tôi suy ngẫm về cuộc sống.",
            "Mỗi trang sách là một hành trình mới, đưa độc giả đi qua nhiều cung bậc cảm xúc.",
            "Cuốn sách là một cuộc phiêu lưu tri thức, khiến tôi mong chờ từng trang.",
            "Nội dung đặc sắc, tạo ra những tình huống không lường trước được.",
            "Tác giả đã khéo léo kết hợp giữa hài hước và sự sâu sắc, làm cho sách trở nên độc đáo.",
            "Sự phát triển của nhân vật được xây dựng một cách tự nhiên và thú vị.",
            "Cuốn sách này là một thách thức đối với tư duy và tình cảm của độc giả.",
            "Nội dung không ngừng làm tăng cường sự hiểu biết và sự tò mò của tôi.",
            "Tác giả đã tạo ra những bất ngờ liên tục, khiến cho truyện không bao giờ nhàm chán.",
            "Sự đa dạng trong nội dung làm cho cuốn sách trở nên phong phú và cuốn hút.",
            "Khả năng miêu tả của tác giả làm cho mọi chi tiết trở nên sống động.",
            "Sự hiện đại và độc đáo trong cách xây dựng câu chuyện đã làm cho tôi say mê.",
            "Sách chứa đựng những bí mật và giải mã, khiến tôi muốn đọc liên tục.",
            "Nội dung không chỉ đưa độc giả đến những địa điểm mới mẻ mà còn đưa đến những suy nghĩ mới.",
            "Tác giả biết cách giữ sự hồi hộp và tò mò qua từng trang sách.",
            "Sự tinh tế trong việc phát triển nhân vật làm cho mỗi cá nhân trở nên sống động.",
            "Cuốn sách này là một hành trình qua thời gian và không gian, kết hợp giữa quá khứ và hiện tại.",
            "Sự sâu sắc trong tư duy của tác giả làm cho nội dung trở nên phức tạp và thú vị.",
            "Nội dung là một sự kết hợp tuyệt vời giữa hành động, tình cảm, và triết lý cuộc sống.",
            "Tác giả đã khám phá những khía cạnh mới của nhân loại thông qua câu chuyện tinh tế.",
            "Sự đan xen giữa những chi tiết nhỏ và tầm quan trọng làm cho đọc sách trở nên hấp dẫn.",
            "Cuốn sách này đưa độc giả đến những thế giới khác nhau, mỗi thế giới đều có sức hút riêng.",
            "Nội dung là một sự kết hợp hài hước và sự đau đớn của cuộc sống hàng ngày.",
            "Sự chân thực trong mô tả nhân vật làm cho tôi cảm thấy như họ là người thật.",
            "Tác giả đã tạo ra một bức tranh toàn cảnh với sự đa dạng và phong phú.",
            "Cuốn sách là một tuyệt phẩm nghệ thuật, từ cách diễn đạt đến cấu trúc câu chuyện.",
            "Sự đặc sắc trong việc phác họa tâm trạng và cảnh quay khiến cho sách trở nên sống động.",
            "Nội dung không chỉ làm cho tôi giải trí mà còn làm cho tôi suy ngẫm sâu sắc về bản thân.",
            "Sự tưởng tượng không giới hạn của tác giả làm cho mỗi trang sách trở nên phấn khích.",
            "Cuốn sách này là một hành trình tri thức, đưa độc giả qua những ý tưởng mới lạ.",
            "Tác giả đã tạo ra những nhân vật độc đáo, mỗi người đều có cái gì đó đặc biệt.",
            "Nội dung là sự kết hợp tinh tế giữa lịch sử, khoa học, và tâm lý.",
            "Sự liên kết giữa các sự kiện làm cho cuốn sách trở nên logic và thú vị.",
            "Tác giả đã đưa ra những câu hỏi sâu sắc, khiến tôi suy ngẫm nhiều sau mỗi lần đọc.",
            "Sự phát triển của cốt truyện làm cho tôi không thể dừng lại, muốn biết tiếp diễn biến.",
            "Cuốn sách này chứa đựng những ý tưởng độc đáo và khám phá mới về thế giới.",
            "Sự tương tác phức tạp giữa các nhân vật tạo nên một mạng lưới liên kết hấp dẫn.",
            "Nội dung không chỉ là giải trí mà còn làm tôi nhận thức được giá trị của kiến thức.",
            "Tác giả đã tạo ra một thế giới mà tôi muốn đắm chìm và khám phá.",
            "Sự sáng tạo trong cách xây dựng câu chuyện làm cho mỗi trang sách đều đặc sắc.",
            "Nội dung chứa đựng những thông điệp sâu sắc về cuộc sống và ý nghĩa của nó.",
            "Tác giả biết cách duy trì sự hấp dẫn từ đầu đến cuối, không có khoảnh khắc nào nhàm chán.",
            "Cuốn sách này là một tác phẩm nghệ thuật, từ ngôn ngữ đến sắp xếp câu chuyện.",
            "Nội dung đưa độc giả đến những thách thức và hành trình khám phá mới.",
            "Tác giả đã tạo ra một hệ thống tri thức phức tạp, làm cho đọc sách trở nên thú vị.",
            "Sự đan xen giữa hành động và ý nghĩa sâu sắc tạo nên một cuốn sách đặc sắc.",
            "Cuốn sách này là một hành trình tuyệt vời qua vùng đất rộng lớn của tri thức.",
            "Sự kết hợp độc đáo giữa hiện đại và cổ điển tạo nên một trải nghiệm đọc sách mới lạ.",
            "Tác giả đã tận dụng tốt không gian trắng để làm cho mỗi trang sách trở nên quan trọng.",
            "Sự sáng tạo trong cách xây dựng cốt truyện làm cho tôi không thể dừng lại.",
            "Cuốn sách này là một bảo tàng tri thức, mở cửa cho độc giả khám phá.",
            "Nội dung không chỉ là giáo dục mà còn làm cho tôi cuốn hút từ đầu đến cuối.",
            "Tác giả đã tạo nên một thế giới mà tôi muốn trải nghiệm trực tiếp.",
            "Sự pha trộn linh hoạt giữa hành động và mảng triết lý làm cho sách thú vị.",
            "Nội dung chứa đựng những nguyên tắc sống quan trọng và chiến lược thành công.",
            "Tác giả đã đưa ra những câu hỏi khó khăn, thách thức tư duy của độc giả.",
            "Cuốn sách này là một cuộc phiêu lưu thông qua kho tàng của kiến thức.",
            "Nội dung đậm chất tâm linh, khiến tôi cảm nhận sự sâu sắc trong cuộc sống.",
            "Tác giả biết cách tạo ra những bất ngờ và làm cho độc giả tò mò.",
            "Sự đan xen của những chi tiết nhỏ tạo nên một bức tranh lớn về cuộc sống.",
            "Cuốn sách này là một đối tác đáng tin cậy trên hành trình khám phá tri thức.",
            "Nội dung tạo ra một không gian tưởng tượng đầy màu sắc và sức sống.",
            "Tác giả đã tận dụng mọi từ ngữ để tạo ra một trải nghiệm đọc tuyệt vời.",
            "Sự phát triển của nhân vật làm cho mỗi cá nhân trở nên gần gũi và thân thiện.",
            "Nội dung là sự kết hợp tinh tế giữa sự học thuật và giải trí.",
            "Cuốn sách là một bức tranh phức tạp về con người và thế giới xung quanh.",
            "Tác giả đã xây dựng một thế giới với các quy tắc riêng biệt, hấp dẫn và đầy thách thức.",
            "Sự liên kết tuyệt vời giữa các phần của sách làm cho cốt truyện mạch lạc.",
            "Nội dung độc đáo, mang đến cái nhìn mới về những vấn đề quen thuộc.",
            "Tác giả đã chọn lọc những từ ngữ một cách tỉ mỉ, làm cho câu chuyện trở nên sống động.",
            "Cuốn sách này là một hành trình từ sâu thẳm trong tâm trí đến những vùng đất chưa biết.",
            "Nội dung chứa đựng những sự kiện bất ngờ, khiến tôi luôn muốn biết tiếp theo là gì.",
            "Tác giả đã tạo nên một không gian tâm hồn, nơi mà mọi suy nghĩ đều được tôn trọng.",
            "Sự phát triển của cốt truyện làm cho mỗi trang sách đều là một chặng đường mới.",
            "Nội dung chứa đựng những bí mật và khám phá, khiến tôi không thể rời mắt khỏi sách.",
            "Tác giả đã thể hiện sự sáng tạo trong việc kết hợp giữa hiện thực và giả tưởng.",
            "Cuốn sách này là một nguồn động viên lớn, khiến tôi nhìn nhận cuộc sống một cách tích cực hơn.",
            "Nội dung là một cuộc phiêu lưu đầy mạo hiểm và những phát hiện đáng kinh ngạc.",
            "Sự đan xen của những cảm xúc và suy nghĩ tạo nên một trải nghiệm đọc độc đáo.",
            "Tác giả đã tạo ra một thế giới đan xen giữa thực tế và ảo, khiến tôi mê mẩn.",
            "Nội dung đưa độc giả qua những thử thách và trải nghiệm đáng nhớ.",
            "Sự hấp dẫn của sách làm cho tôi muốn đọc nó một cách chậm rãi để tận hưởng mỗi khoảnh khắc.",
            "Tác giả đã chứng minh khả năng sáng tạo không giới hạn trong cách xây dựng câu chuyện.",
            "Sự linh hoạt của cốt truyện khiến cho mỗi sự kiện trở nên hấp dẫn và đầy ý nghĩa.",
            "Nội dung chứa đựng những triết lý cuộc sống sâu sắc, khiến tôi suy ngẫm nhiều.",
            "Tác giả đã tạo ra những nhân vật mà tôi không thể quên, với những tính cách đặc sắc.",
            "Cuốn sách này là một hành trình tinh thần, làm tôi nhìn nhận cuộc sống một cách mới mẻ.",
            "Nội dung là sự kết hợp tinh tế giữa mối quan hệ và những đỉnh cao tri thức.",
            "Tác giả đã đưa ra những góc nhìn độc đáo về những vấn đề phức tạp của cuộc sống.",
            "Sự đan xen của các yếu tố tâm lý và hành động tạo nên một câu chuyện cực kỳ hấp dẫn.",
            "Cuốn sách này là một hành trình khám phá những khía cạnh mới và thú vị của tri thức.",
            "Nội dung là một sự hòa quyện giữa yếu tố cá nhân và văn hóa, làm cho câu chuyện thêm phần đa dạng.",
            "Tác giả đã đưa ra những câu chuyện nhỏ đẹp nhất, khiến tôi cảm thấy ấm lòng.",
            "Sự đan xen của những câu chuyện nhỏ tạo nên một tác phẩm toàn cảnh và sâu sắc.",
            "Nội dung giúp mở rộng tầm nhìn và đưa độc giả đến những địa điểm chưa từng đặt chân.",
            "Tác giả đã tạo ra một cuộc phiêu lưu tâm hồn, làm cho tôi cảm nhận rõ giá trị của trải nghiệm cuộc sống.",
            "Cuốn sách này là một mảnh ghép quan trọng trong hành trình đọc sách của tôi.",
            "Sự hòa quyện của các sự kiện làm cho cuốn sách trở nên không thể dự đoán.",
            "Tác giả đã tạo ra một thế giới đẹp tuyệt, với những hình ảnh sống động và rực rỡ.",
            "Nội dung là một nguồn động viên mạnh mẽ, khiến tôi tin rằng mọi khó khăn đều có thể vượt qua.",
            "Tác giả đã chứng minh sự linh hoạt và sáng tạo trong cách kể chuyện.",
            "Sự phát triển của nhân vật là một hành trình đầy cảm xúc và sự trưởng thành.",
            "Cuốn sách là sự giao thoa tuyệt vời giữa thế giới thực và thế giới tưởng tượng.",
            "Nội dung chứa đựng những thông điệp tích cực và lối sống lành mạnh.",
            "Tác giả đã tạo nên những tình huống kịch tính, khiến tôi không muốn dừng đọc.",
            "Sự hòa quyện của các chi tiết nhỏ tạo nên một câu chuyện hấp dẫn và đầy ấn tượng.",
            "Cuốn sách này là một hành trình vào sâu trong tâm trí và tâm hồn của độc giả.",
            "Sự phong phú trong nội dung khiến cho mỗi trang sách trở nên thú vị.",
            "Tác giả đã tạo ra một không gian tưởng tượng, nơi mọi giới hạn đều có thể vượt qua.",
            "Nội dung chứa đựng những ý tưởng mới mẻ, khiến tôi suy ngẫm và suy nghĩ sau mỗi lần đọc.",
            "Tác giả đã tạo ra những nhân vật độc đáo, mỗi người đều mang đến cái gì đó đặc biệt.",
            "Sự hấp dẫn của sách làm cho tôi muốn quay lại đọc lần thứ hai.",
            "Nội dung giúp mở rộng tầm nhìn về thế giới và con người.",
            "Tác giả đã tạo ra một bức tranh toàn cảnh về cuộc sống, đầy những mảng sáng tạo.",
            "Sự phát triển của cốt truyện là một hành trình đầy màu sắc và biến động.",
            "Cuốn sách này là một lò sưởi tri thức, làm cho tôi cảm nhận được sức nóng từ mỗi trang.",
            "Sự đan xen của các yếu tố tâm linh và hành động làm cho câu chuyện trở nên sâu sắc.",
            "Nội dung chứa đựng những triết lý cuộc sống quan trọng, làm tôi nhận thức sâu sắc hơn về bản thân.",
            "Tác giả đã tạo ra một thế giới đầy ảo diệu và bí ẩn, làm tôi mê mẩn.",
            "Cuốn sách này mang đến một trải nghiệm đọc sâu sắc, kết hợp giữa tri thức và tận hưởng.",
            "Sự sáng tạo trong nội dung làm cho mỗi trang sách trở nên như một tác phẩm nghệ thuật.",
            "Tác giả đã tạo ra một thế giới tưởng tượng phong phú, làm tôi mê mẩn từ đầu đến cuối.",
            "Nội dung không chỉ làm tôi giải trí mà còn khám phá những ý tưởng sâu sắc về cuộc sống.",
            "Cuốn sách này là một hành trình tri thức, đưa độc giả đi qua những khía cạnh mới của kiến thức.",
            "Tác giả biết cách tạo ra những nhân vật sống động, khiến tôi liên kết mạnh mẽ với họ.",
            "Nội dung đưa độc giả đến những thế giới độc đáo, mỗi thế giới đều mang một bí mật riêng.",
            "Sự đan xen của các yếu tố tâm lý và hành động làm cho câu chuyện trở nên phức tạp và đầy hấp dẫn.",
            "Tác giả đã sử dụng ngôn ngữ tinh tế, làm cho mỗi từ ngữ trở nên quan trọng và đầy ý nghĩa.",
            "Cuốn sách này là một hành trình sâu sắc vào trí tuệ và lòng người.",
            "Nội dung chứa đựng những bí mật mà tôi không thể đoán trước, khiến mỗi trang đều là một bất ngờ mới.",
            "Tác giả đã tạo nên một cốt truyện vô cùng hấp dẫn, khiến tôi không muốn dừng lại.",
            "Sự đa dạng của nội dung làm cho cuốn sách trở nên đầy màu sắc và thú vị.",
            "Tác giả đã khám phá những khía cạnh mới của nhân loại thông qua những câu chuyện cuốn hút.",
            "Nội dung là một sự pha trộn tuyệt vời giữa hành động và sự hiểu biết về tâm lý con người.",
            "Cuốn sách này là một bữa tiệc tri thức, khiến tôi muốn tham gia mãi mãi.",
            "Tác giả đã tạo nên những tình huống không lường trước được, khiến cho câu chuyện trở nên hấp dẫn.",
            "Sự phát triển của nhân vật là một hành trình đầy cảm xúc và ý nghĩa.",
            "Nội dung chứa đựng những thông điệp sâu sắc về cuộc sống, khiến tôi suy ngẫm nhiều.",
            "Tác giả đã tạo nên một không gian tưởng tượng độc đáo, nơi mọi điều đều có thể xảy ra.",
            "Sự đan xen giữa thực tế và huyền bí làm cho cuốn sách trở nên rất cuốn hút.",
            "Nội dung là một hành trình qua thời gian và không gian, đưa độc giả đến những địa điểm mới mẻ.",
            "Tác giả đã tạo nên một môi trường tâm hồn, khiến tôi cảm nhận rõ hơn về bản chất con người.",
            "Sự kết hợp tinh tế giữa hài hước và sự sâu sắc làm cho sách trở nên độc đáo.",
            "Cuốn sách này là một hành trình khám phá tri thức, làm cho tôi muốn tiếp tục đọc.",
            "Nội dung đưa độc giả vào một thế giới mới, nơi mà mọi giới hạn đều có thể vượt qua.",
            "Tác giả đã tạo ra một không gian tâm hồn, nơi mọi cảm xúc đều được thể hiện chân thật.",
            "Sự phát triển của cốt truyện là một sự kết hợp tuyệt vời giữa trí tuệ và tình cảm.",
            "Nội dung làm cho tôi đặt ra nhiều câu hỏi và tìm kiếm sự hiểu biết.",
            "Tác giả đã tạo nên một cuộc phiêu lưu tri thức, đưa độc giả đến những đỉnh cao mới.",
            "Cuốn sách này là một hành trình tâm huyết, làm tôi cảm thấy kích thích và hứng khởi.",
            "Sự đan xen giữa các yếu tố tâm lý và hành động tạo nên một cuộc phiêu lưu đặc sắc.",
            "Nội dung chứa đựng những tư duy sâu sắc, khiến tôi suy ngẫm về cuộc sống.",
            "Tác giả đã tạo ra những tình huống không ngờ, khiến tôi không thể dừng lại.",
            "Sự hòa quyện giữa hành động và triết lý làm cho sách trở nên phong phú và đa dạng.",
            "Nội dung là một sự kết hợp độc đáo giữa huyền bí và hiện thực, khiến tôi say mê.",
            "Tác giả biết cách tạo nên những nhân vật mà độc giả có thể đồng cảm và gắn kết.",
            "Sự linh hoạt của cốt truyện khiến cho mỗi trang sách trở nên thú vị và bất ngờ.",
            "Cuốn sách này là một hành trình khám phá những sự thật ẩn sau bức màn cuộc sống.",
            "Nội dung chứa đựng những câu chuyện nhỏ tinh tế, khiến tôi cảm nhận sự ấm áp và chân thật.",
            "Tác giả đã tạo nên một thế giới độc đáo và phức tạp, nơi mọi điều đều có ý nghĩa.",
            "Sự hấp dẫn của sách không chỉ đến từ cốt truyện mà còn từ sự sáng tạo trong việc diễn đạt.",
            "Nội dung chứa đựng những triết lý sâu sắc, khiến tôi suy ngẫm về ý nghĩa của cuộc sống.",
            "Tác giả đã tạo ra một cuộc hành trình không chỉ là của nhân vật mà còn là của độc giả.",
            "Sự đan xen của các sự kiện làm cho cuốn sách trở nên hấp dẫn và không thể bỏ qua.",
            "Nội dung giúp mở mang tầm nhìn, làm cho tôi hiểu rõ hơn về thế giới xung quanh.",
            "Tác giả đã tạo nên những nhân vật có tính cách và độ phong cách riêng biệt.",
            "Sự phát triển của cốt truyện là một hành trình tri thức, khiến tôi không thể rời mắt khỏi sách.",
            "Cuốn sách này là một kho tàng tri thức, mở cửa cho độc giả khám phá sự đa dạng của kiến thức.",
            "Nội dung chứa đựng những bí mật tinh tế, khiến tôi muốn đọc từng trang một.",
            "Tác giả đã tạo nên một không gian tưởng tượng phong phú, làm tôi mê mẩn.",
            "Sự đan xen của các yếu tố tâm linh và hành động làm cho sách trở nên phức tạp và đầy hấp dẫn.",
            "Nội dung làm tôi suy ngẫm về ý nghĩa sâu sắc của cuộc sống và sự tồn tại.",
            "Tác giả biết cách tạo ra một thế giới mà độc giả muốn lạc vào và không bao giờ muốn rời đi.",
            "Sự phát triển của nhân vật là một hành trình đầy cảm xúc và ý nghĩa.",
            "Cuốn sách này là một chuyến phiêu lưu tri thức, làm tôi cảm thấy phấn khích và sẵn sàng khám phá.",
            "Nội dung giúp mở rộng tầm nhìn về thế giới và con người, làm cho tôi trở nên giàu trí tuệ.",
            "Tác giả đã tạo nên những tình huống đầy kịch tính, khiến tôi không thể dừng lại.",
            "Sự hòa quyện giữa hành động và triết lý làm cho sách trở nên phong phú và đa dạng.",
            "Nội dung chứa đựng những sự kiện bất ngờ, khiến tôi luôn muốn biết tiếp theo là gì.",
            "Tác giả đã tạo ra một không gian tâm hồn, nơi mọi cảm xúc đều được thể hiện chân thật.",
            "Sự phát triển của cốt truyện là một sự kết hợp tuyệt vời giữa trí tuệ và tình cảm.",
        ]

        const books = await Book.all()
        const users = await User.all()


        for (const book of books) {
            const comments = getRandomElementsFromArray(commentArr)
            for (const comment of comments) {
                const createdAt = DateTime.fromFormat(this.getRandomDateTime(), 'yyyy-MM-dd HH:mm:ss')
                await book.related('comments').create({
                    isbnCode: book.isbnCode,
                    content: comment,
                    rateStar: randomIntWithProbability(),
                    userId: getRandomObject(users)?.id,
                    createdAt: createdAt,
                })
            }
        }

    }

    // Hàm tạo ngày giờ ngẫu nhiên từ tháng 1/2020 đến tháng 12/2023
    private getRandomDateTime() {
        const startYear = 2020;
        const endYear = 2023;
        const startMonth = 0; // Tháng 1
        const endMonth = 11; // Tháng 12

        // Tính toán số mili giây tương ứng với ngày bắt đầu và ngày kết thúc
        const startDate = new Date(startYear, startMonth, 1).getTime();
        const endDate = new Date(endYear, endMonth + 1, 0).getTime();

        // Tạo một số ngẫu nhiên trong khoảng từ startDate đến endDate
        const randomTime = startDate + Math.random() * (endDate - startDate);

        // Tạo đối tượng Date từ số mili giây ngẫu nhiên
        const randomDate = new Date(randomTime);

        // Định dạng ngày tháng giờ phút giây theo ý muốn
        const formattedDateTime = `${randomDate.getFullYear()}-${String(randomDate.getMonth() + 1).padStart(2, '0')}-${String(randomDate.getDate()).padStart(2, '0')} ${String(randomDate.getHours()).padStart(2, '0')}:${String(randomDate.getMinutes()).padStart(2, '0')}:${String(randomDate.getSeconds()).padStart(2, '0')}`;

        return formattedDateTime;
    }
}
