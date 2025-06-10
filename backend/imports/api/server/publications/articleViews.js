import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ArticleViews } from '../../articleViews';
import { removeWeirdMinusSignsInFrontOfString } from '../../../lib/utils/utils_string';
import { NewsArticles } from '../../articles';

Meteor.publish('articleViews', function (articleId) {
    check(articleId, String);
    const userId = Meteor.userId();
    if (!userId) {
        return null;
    }
    const cleanArticleId = removeWeirdMinusSignsInFrontOfString(articleId);

    // optimisation start
    // const fullArticle = NewsArticles.findOne({ _id: cleanArticleId });

    // if (fullArticle) {
    //     // Force mutation of body to trigger reactivity
    //     const fullFields = {
    //         ...fullArticle,
    //         body: [...(fullArticle.body || [])], // force array copy
    //     };

    //     this.changed('newsArticlesJoined', fullArticle._id, fullFields);
    // }
    // optimisation end

    return ArticleViews.find(
        {
            articleId: cleanArticleId,
            userId,
        },
    );
});
