#imports
import pandas as pd
import joblib

def coach_change(row, data):
    team = str(row.Team)
    season = int(row.Season)
    try:
        curr_coach = data[(data['Team'] == team) & (data['Season'] == season)]['Coach']
        curr_coach = curr_coach[curr_coach.index[0]]
        next_coach = data[(data['Team'] == team) & (data['Season'] == season + 1)]['Coach']
        next_coach = next_coach[next_coach.index[0]]
        if curr_coach != next_coach:
            return 'Yes'
        return 'No'
    except:
        return 'No'


def improve(row, column, data):
    try: 
        id = int(row['PlayerId'])
        season = int(row['Season'])
        column = column
        imp = float(data[(data['PlayerId'] == id) & (data['Season'] == season)][column]) > float(data[(data['PlayerId'] == id) & (data['Season'] == season-1)][column])
        if imp:
            return 'Yes' 
        return 'No'
    except:
        return 'Yes'
 

def compare(row, column, data):
    star = int(row['Stars'])
    year = int(row['Yr'])
    stat = column
    pos = str(row['Position'])
    id = int(row['PlayerId'])
    season = int(row['Season'])
    mean = data[(data['Stars'] == star) & (data['Yr'] == year) & (data['Position'] == pos)][stat].mean()
    p_stat = data[(data['PlayerId'] == id)&(data['Season'] == season)][stat]
    p_stat = p_stat[p_stat.index[0]]
    if int(p_stat>mean):
        return 1
    elif int(p_stat<mean):
        return -1
    else:
        return 0


def get_player_proba(data):

    #Get player data to proper format
    data['Stars'] = data['Stars'].fillna(0)
    data['Yr'] = data['Yr'].fillna(0)
    data = data.drop(columns=['Transfer_Portal','PositionId', 'ConferenceId', 'TeamId'])

    coaching_data = pd.read_csv('Data/Coaching Data.csv', skiprows = [0,1], skipfooter = 202)
    coaching_data = coaching_data.rename(columns = {'FBS Team': 'Team'})
    coaching_data = coaching_data[['Team','2019','2020','2021','2022','2023','2024']]
    coaching_data = coaching_data.melt(id_vars='Team', var_name = 'Season', value_name = 'Coach')
    coaching_data['Season'] = coaching_data['Season'].astype('int64')
    data['Coach Change'] = data.apply(lambda x: coach_change(x, coaching_data), axis = 1)

    file = pd.read_csv('Data/Player Recruit Ranking/2023.csv')
    file.rename(columns = {'AthleteId': 'PlayerId', 'Year': 'Class of'}, inplace = True)
    data = data.merge(file, on = 'PlayerId', how = 'left', suffixes = [None, '_' + str(2023)])

    for i in range(0,9):
        data['Stars'] = data['Stars'].combine_first(data['Stars_' + str(i)])
        data.drop(columns = ['Stars_' + str(i)], inplace = True)
    for i in range(1,9):
        data['Rating'] = data['Rating'].combine_first(data['Rating_' + str(i)])
        data['Ranking'] = data['Ranking'].combine_first(data['Ranking_' + str(i)])
        data['Class of'] = data['Class of'].combine_first(data['Class of_' + str(i)])
        data.drop(columns = ['Rating_' + str(i)], inplace = True)
        data.drop(columns = ['Ranking_' + str(i)], inplace = True)
        data.drop(columns = ['Class of_' + str(i)], inplace = True)

    data['Yr'] = data['Season'] - data['Class of'] + 1
    data.drop(columns = ['Class of'], inplace = True)

    data['Stars'] = data['Stars'].fillna(0)
    data['Yr'] = data['Yr'].fillna(0) 
    
    #If defense
    if data['Position'].isin(['DT', 'DE', 'DL','DB', 'CB', 'S','LB']):

        data['Pct_Team_INT'] = data['INT']/data['Team interceptions']
        data['Pct_Team_SACKS'] = data['SACKS']/data['Team sacks']
        data['Pct_Team_TFL'] = data['TFL']/data['Team tacklesForLoss']

        feats = ['FUM', 'INT', 'PD', 'QB HUR', 'SACKS', 'SOLO', 'Pct_Team_INT', 'Pct_Team_SACKS', 'Pct_Team_TFL']
        for feat in feats:
            data[feat+'_improve'] = data.apply(lambda x: improve(x, feat, data), axis = 1)

        rel_feats = ['FUM', 'INT', 'PD', 'QB HUR', 'SACKS', 'SOLO', 'Pct_Team_INT', 'Pct_Team_SACKS', 'Pct_Team_TFL',
                'FUM_improve', 'INT_improve', 'PD_improve', 'QB HUR_improve', 'SACKS_improve', 'SOLO_improve', 
                'Pct_Team_INT_improve', 'Pct_Team_SACKS_improve', 'Pct_Team_TFL_improve', 
                'Team','Conference','Position','Yr','Stars', 'Coach Change', 'Ranking', 'Rating']
        
        data = data[rel_feats]
        data['Yr'] = data['Yr'].astype('str')
        data['Stars'] = data['Stars'].astype('str')

        column_transform = joblib.load("column_transform_defense.joblib")
        data = column_transform.transform(data).toarray()
        clf = joblib.load("DefensiveCLF.joblib")

        proba = clf.predict_proba(data)[1]

        return proba
    
    #If QB
    if data['Position'] == 'QB':

        data['Pct_Team_Pass_Yds'] = data['YDS']/data['Team netPassingYards']
        data['Pct_Team_Pass_Attempts'] = data['ATT']/data['Team passAttempts']
        data['Pct_Team_Pass_TDs'] = data['TD']/data['Team passingTDs']
        data['Pct_Team_Pass_Completions'] = data['COMPLETIONS']/data['Team passCompletions']
        data['Pct_Team_Ints'] = data['INT']/data['Team passesIntercepted']

        feats = ['Usage Overall', 'Usage Pass', 'Usage Rush', 'Usage FirstDown','Usage SecondDown', 'Usage ThirdDown', 'Usage StandardDowns',
       'Usage PassingDowns','ATT', 'AVG','COMPLETIONS','INT','LONG','PCT','TD','YDS', 'YPA','Pct_Team_Pass_Yds', 'Pct_Team_Pass_Attempts', 'Pct_Team_Pass_TDs',
       'Pct_Team_Pass_Completions', 'Pct_Team_Ints']
        for feat in feats:
            data[feat+'_improve'] = data.apply(lambda x: improve(x, feat, data), axis = 1)
            data[feat + '_compare'] = data.apply(lambda x: compare(x, feat, data), axis = 1)

        rel_feats = ['Usage Overall', 'Usage Pass', 'Usage Rush', 'Usage FirstDown','Usage SecondDown', 'Usage ThirdDown', 'Usage StandardDowns',
             'Usage PassingDowns','ATT','COMPLETIONS','INT','LONG','PCT','TD','YDS', 'YPA','Pct_Team_Pass_Yds', 'Pct_Team_Pass_Attempts', 'Pct_Team_Pass_TDs',
             'Pct_Team_Pass_Completions', 'Pct_Team_Ints', 'Usage Overall_improve',
             'Usage Pass_improve', 'Usage Rush_improve', 'Usage FirstDown_improve',
             'Usage SecondDown_improve', 'Usage ThirdDown_improve',
             'Usage StandardDowns_improve', 'Usage PassingDowns_improve',
             'ATT_improve', 'AVG_improve', 'COMPLETIONS_improve', 'INT_improve',
             'LONG_improve', 'PCT_improve', 'TD_improve', 'YDS_improve',
             'YPA_improve', 'Pct_Team_Pass_Yds_improve',
             'Pct_Team_Pass_Attempts_improve', 'Pct_Team_Pass_TDs_improve',
             'Pct_Team_Pass_Completions_improve', 'Pct_Team_Ints_improve', 'Usage Overall_compare', 'Usage Pass_compare', 'Usage Rush_compare',
             'Usage FirstDown_compare', 'Usage SecondDown_compare',
             'Usage ThirdDown_compare', 'Usage StandardDowns_compare',
             'Usage PassingDowns_compare', 'ATT_compare', 'AVG_compare',
             'COMPLETIONS_compare', 'INT_compare', 'LONG_compare', 'PCT_compare',
             'TD_compare', 'YDS_compare', 'YPA_compare', 'Pct_Team_Pass_Yds_compare',
             'Pct_Team_Pass_Attempts_compare', 'Pct_Team_Pass_TDs_compare',
             'Pct_Team_Pass_Completions_compare', 'Pct_Team_Ints_compare','Position','Yr','Stars', 'Coach Change', 'Ranking', 'Rating']
        
        data = data[rel_feats]
        data['Yr'] = data['Yr'].astype('str')
        data['Stars'] = data['Stars'].astype('str')

        column_transform = joblib.load("column_transform_qb.joblib")
        data = column_transform.transform(data).toarray()
        clf = joblib.load("qb_classifier.joblib")

        proba = clf.predict_proba(data)[1]

        return proba

    #If RB
    if data['Position'] == 'RB':

        data['Pct_Team_Rush_Yds'] = data['YDS']/data['Team rushingYards']
        data['Pct_Team_Rush_Attempts'] = data['CAR']/data['Team rushingAttempts']
        data['Pct_Team_Rush_TDs'] = data['TD']/data['Team rushingTDs']

        feats = ['Usage Overall', 'Usage Rush', 'Usage Pass','Usage PassingDowns', 'Usage StandardDowns', 'Usage FirstDown', 'Usage SecondDown', 'Usage ThirdDown', 'AVG', 
         'CAR', 'YPC', 'REC', 'YPR', 'Pct_Team_Rush_Yds', 'Pct_Team_Rush_Attempts', 'Pct_Team_Rush_TDs']
        for feat in feats:
            data[feat+'_improve'] = data.apply(lambda x: improve(x, feat, data), axis = 1)
            data[feat + '_compare'] = data.apply(lambda x: compare(x, feat, data), axis = 1)

        rel_feats = ['Usage Overall', 'Usage Rush','Usage StandardDowns', 'Usage FirstDown', 'Usage SecondDown', 'Usage ThirdDown', 'AVG', 
             'CAR', 'YPC', 'REC', 'YPR', 'Pct_Team_Rush_Yds', 'Pct_Team_Rush_Attempts', 'Pct_Team_Rush_TDs',
             'Usage Overall_improve', 'Usage Rush_improve', 'Usage Pass_improve',
             'Usage PassingDowns_improve', 'Usage StandardDowns_improve',
             'Usage FirstDown_improve', 'Usage SecondDown_improve',
             'Usage ThirdDown_improve', 'AVG_improve', 'CAR_improve', 'YPC_improve',
             'REC_improve', 'YPR_improve', 'Pct_Team_Rush_Yds_improve',
             'Pct_Team_Rush_Attempts_improve', 'Pct_Team_Rush_TDs_improve','Usage Overall_compare', 'Usage Rush_compare', 'Usage Pass_compare',
             'Usage PassingDowns_compare', 'Usage StandardDowns_compare',
             'Usage FirstDown_compare', 'Usage SecondDown_compare',
             'Usage ThirdDown_compare', 'AVG_compare', 'CAR_compare', 'YPC_compare',
             'REC_compare', 'YPR_compare', 'Pct_Team_Rush_Yds_compare',
             'Pct_Team_Rush_Attempts_compare', 'Pct_Team_Rush_TDs_compare',
             'Position','Yr','Stars', 'Coach Change', 'Ranking', 'Rating', 'Transfer_Portal']
        
        data = data[rel_feats]
        data['Yr'] = data['Yr'].astype('str')
        data['Stars'] = data['Stars'].astype('str')

        column_transform = joblib.load("column_transform_rb.joblib")
        data = column_transform.transform(data).toarray()
        clf = joblib.load("rb_classifier.joblib")

        proba = clf.predict_proba(data)[1]

        return proba
    
    #If WR or TE
    if data['Position'].isin(['WR', 'TE']):

        data['Pct_Team_Pass_Yds'] = data['YDS']/data['Team netPassingYards']
        data['Pct_Team_Pass_TDs'] = data['TD']/data['Team passingTDs']
        data['Pct_Team_Receptions'] = data['REC']/data['Team passCompletions']

        feats = ['Usage Overall', 'Usage Pass', 'Usage Rush', 'Usage FirstDown','Usage SecondDown', 'Usage ThirdDown', 'Usage StandardDowns',
       'Usage PassingDowns','REC', 'AVG','CAR','TD','YDS', 'YPR','Pct_Team_Pass_Yds',  'Pct_Team_Pass_TDs',
       'Pct_Team_Receptions']
        for feat in feats:
            data[feat+'_improve'] = data.apply(lambda x: improve(x, feat, data), axis = 1)
            data[feat + '_compare'] = data.apply(lambda x: compare(x, feat, data), axis = 1)

        rel_feats = ['Usage Overall', 'Usage Pass', 'Usage Rush', 'Usage FirstDown','Usage SecondDown', 'Usage ThirdDown', 'Usage StandardDowns',
             'Usage PassingDowns','REC', 'AVG','CAR','TD','YDS', 'YPR','Pct_Team_Pass_Yds',  'Pct_Team_Pass_TDs',
             'Pct_Team_Receptions','Usage Overall_improve',
             'Usage Pass_improve', 'Usage Rush_improve', 'Usage FirstDown_improve',
             'Usage SecondDown_improve', 'Usage ThirdDown_improve',
             'Usage StandardDowns_improve', 'Usage PassingDowns_improve',
             'REC_improve', 'AVG_improve',
             'CAR_improve', 'TD_improve', 'YDS_improve', 'YPR_improve',
             'Pct_Team_Pass_Yds_improve', 'Pct_Team_Pass_TDs_improve',
             'Pct_Team_Receptions_improve','Usage Overall_compare',
             'Usage Pass_compare', 'Usage Rush_compare', 'Usage FirstDown_compare',
             'Usage SecondDown_compare', 'Usage ThirdDown_compare',
             'Usage StandardDowns_compare', 'Usage PassingDowns_compare',
             'REC_compare', 'AVG_compare', 'CAR_compare', 'TD_compare',
             'YDS_compare', 'YPR_compare', 'Pct_Team_Pass_Yds_compare',
             'Pct_Team_Pass_TDs_compare', 'Pct_Team_Receptions_compare','Position','Yr','Stars', 'Coach Change', 'Ranking', 'Rating', 'Transfer_Portal']
        
        data = data[rel_feats]
        data['Yr'] = data['Yr'].astype('str')
        data['Stars'] = data['Stars'].astype('str')

        column_transform = joblib.load("column_transform_wr_te.joblib")
        data = column_transform.transform(data).toarray()
        clf = joblib.load("wr_te_classifier.joblib")

        proba = clf.predict_proba(data)[1]

        return proba