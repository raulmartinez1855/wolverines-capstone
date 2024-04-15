from pandas import DataFrame, Series
from sklearn.base import ClassifierMixin
from sklearn.discriminant_analysis import StandardScaler
from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.pipeline import Pipeline


def grid_cv_model(
    X: DataFrame,
    y: Series,
    model: ClassifierMixin,
    params: dict[str, list],
    cv: int,
    scoring: str,
):
    """
    Grid search cross validation for a given model.

    Parameters:
        X (DataFrame): predictors
        y (Series): target
        model (ClassifierMixin): the model to be used, must be a Classification Model
        params (dict): the parameters to be used in the grid search
        cv (int): number of stratified cross validation folds
        scoring (str): the scoring metric to be used
    Returns:
        grid_search_cv_model (GridSearchCV[Pipeline]):  the grid search cv object with a usable model
    """

    steps = [
        ("scaler", StandardScaler()),
        ("model", model),
    ]

    std_parms = {f"model__{k}": v for k, v in params.items()}

    kfolds = StratifiedKFold(cv)

    pipeline = Pipeline(steps)

    grid_search_cv_model = GridSearchCV(
        pipeline,
        param_grid=std_parms,
        scoring=scoring,
        cv=kfolds.split(X, y),
        n_jobs=-1,
    )

    grid_search_cv_model.fit(X, y)

    return grid_search_cv_model


# Example Usage
# from clf_utils import grid_cv_model
# RANDOM_STATE = 42
# gb_clf = grid_cv_model(
#     X=X_train,
#     y=y_train,
#     model=GradientBoostingClassifier(),
#     params={
#         "random_state": [RANDOM_STATE],
#         "learning_rate": [0.1, 0.2, 0.4],
#         "n_estimators": [5, 10, 100],
#         "max_depth": [None, 2, 5, 20],
#         "max_leaf_nodes": [None, 2, 5, 20],
#     },
#     cv=5,
#     scoring="f1",
# )
