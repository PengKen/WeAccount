import {API_URL, DEVICE_INFO} from "./constant";
import Toast from 'react-native-root-toast';
import {SmallClose} from "../icons/common";
import { Text,Image,View } from 'react-native';
import React from 'react'
import Loading from "../components/Loading";
// Add a Toast on screen.
import { Store } from '../../App'


export default class HttpUtil {
    static fetch(url,method='GET',data) {
        var options = {

            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                // 'Authorization': DEVICE_INFO.UniqueID, //将uniqueID作为更换设备的凭据
                'Auth-Token':Store.getState().GLOBAL.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Ip-Address': DEVICE_INFO.IPAddress,
                // 'Device-System': DEVICE_INFO.PhoneBrand + " " + DEVICE_INFO.SystemVersion //品牌和系统版本
            },
            method , // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        }

        /**
         * POST、DELETE、PUT请求要添加body
         */

        if(method != 'GET'){

            try{
                options.body =  JSON.stringify(data) // must match 'Content-Type' header
            }catch(err){
                console.log(err)
            }

        }

        return new Promise((resolve, reject) => {
            /**
             * 一个Promise中只能有一个resolve或者一个reject，
             * 所以要么10s后超时，要么10s内请求到数据(超时)
             */
            setTimeout(function () {
                resolve({errorMessage:'请求超时'})
            },100000)
            fetch(API_URL + url, options)
                .then(response => {
                    /**
                     * 只要status不是200，response.ok 就是false，但是无论ok是false还是true，到下一个then的时候
                     * 都不会跳到reject去，所以当response.ok 不是true 的时候我们要手动处理请求异常的信息
                     */
                    console.log(response.headers.map)
                    console.log(response)
                    return response.json()

                })
                .then(json => {
                    if(json.errorMessage){
                        let toast = Toast.show(json.errorMessage, {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.CENTER,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        resolve()
                    }
                    else{

                        resolve(json)
                    }


                })
                .catch(error => {
                    /**
                     * 一般到这里的error都是因为网络的问题
                     */
                    let toast = Toast.show('网络问题' , {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                        shadowColor:'#2C2424',
                    });

                    console.warn('There has been a problem with your fetch operation: ');
                    console.log(error)
                })
        })

    }
}